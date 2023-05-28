#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import * as logger from "loglevel";
import dotenv from "dotenv";
import { Command } from "commander";

// Exceptions should be reported with code references to the original source
import "source-map-support/register";

import { existsRecipe, showRecipes, validateRecipe } from "./recipes";
import { readParameters } from "./parameters";
import { createRecipeProgram } from "./commanderUtils";
import { getSettings, setSettings } from "./settings";
import { aiGenerator } from "./aiGenerator";
import { wordWrapAndTrim } from "./wordWrapAndTrim";
import { getPromptForRecipe, getPromptTemplate } from "./prompt";
import { ensureFolderForFile } from "./fileUtil";
import { findEnvFile, findProjectRoot, loadPackageJson, validateNodeVersion } from "./packageJson";
import { logCompletion, logConstructedPrompt, logOptions, logPromptTemplate, logRecipe } from "./contextLogger";
import { log } from "console";

(async () => {
    validateNodeVersion();

    // read .env file
    const envPath = findEnvFile(process.cwd());
    if (envPath) {
        logger.debug('Found .env file at', envPath);
    } else {
        logger.error('Did not find a .env file');
    }
    dotenv.config({ path: envPath! });

    try {
        if (process.argv.length < 3) {
            const packageJson = loadPackageJson();
            logger.setDefaultLevel("info");

            logger.info(packageJson.description);
            logger.info(`Version: ${packageJson.version}, author: ${packageJson.author.name}, license: ${packageJson.license}\n`);
            showRecipes();
        } else {
            const recipe = process.argv[2];
            let program: Command;
            if (existsRecipe(recipe)) {
                validateRecipe(recipe);
                const parameters = readParameters(recipe);
                program = createRecipeProgram(recipe, parameters, async (options) => {
                    setSettings(options); // read global settings from environment variables and command line options
                    const settings = getSettings();
                    if (settings.verbose || settings.dryRun) {
                        logger.setDefaultLevel("info");
                    }
                    if (settings.debug) {
                        logger.setDefaultLevel("debug");
                    }
                    logRecipe(recipe);
                    logOptions(options);
                    validateRecipe(recipe);
                    const promptTemplate = getPromptTemplate(recipe);
                    logPromptTemplate(promptTemplate);
                    const prompt = await getPromptForRecipe(recipe, options);
                    logConstructedPrompt(prompt);
                    let generatedOutput: string;

                    if (settings.dryRun) {
                        logger.info("Dry run, not sending prompt to the language model, completion is 'Dry-run completion on prompt:\n<prompt>'\n");
                        generatedOutput = `Dry-run completion on prompt: ${prompt}`;
                    } else {
                        logger.debug("Sending the prompt to the language model");
                        generatedOutput = await aiGenerator(recipe, prompt);
                    }

                    const outputFormat = options.outputFormat ? options.outputFormat : "txt";
                    
                    if (settings.showOutput || settings.verbose) {
                        displayOutput(generatedOutput, outputFormat);
                    }

                    generateOutput(generatedOutput, path.join(settings.textsOutputFolder, options.output), outputFormat);
                });
                program.parse(process.argv);
            } else {
                logger.error(`Recipe '${recipe}' does not exist`);
                showRecipes();
            }
        }
    } catch (error) {
        console.log(`${error}`);
    }
})();

function generateOutput(output: string, outputPath: string, outputFormat: string): void {

    if (!output) {
        throw new Error("No output");
    }

    if (!outputPath) {
        throw new Error("No output path");
    }

    const projectRootFolder = findProjectRoot(process.cwd());
    if (!projectRootFolder) {
        throw new Error(`Could not find project root, folder ${process.cwd()} is not part of a project`);
    }
    const outputFormatsJsonPath = path.join(projectRootFolder, "output-formats.json");
    if (!fs.existsSync(outputFormatsJsonPath)) {
        throw new Error(`Could not find output-formats.json file in project root ${projectRootFolder}`);
    }

    const outputFormatsJson = fs.readJsonSync(outputFormatsJsonPath);
    if (!outputFormatsJson[outputFormat]) {
        throw new Error(`Could not find output format '${outputFormat}' in output-formats.json file in project root ${projectRootFolder}`);
    }

    const extension = outputFormatsJson[outputFormat].extension;
    const wrappedExtension = outputFormatsJson[outputFormat].wrappedExtension;
    const wrapSize = outputFormatsJson[outputFormat].wrapSize ? outputFormatsJson[outputFormat].wrapSize : 80;

    const outputFullPath = outputPath + "." + extension;
    ensureFolderForFile(outputFullPath);
    logger.info(`Writing output to ${outputFullPath}`);
    fs.writeFileSync(outputFullPath, output);

    if (wrappedExtension) {
        const wrappedOutputFullPath = outputPath + "." + wrappedExtension; // wrapped is always assumed text
        const wrappedOutput = wordWrapAndTrim(output, wrapSize);
        ensureFolderForFile(wrappedOutputFullPath);
        logger.info(`Writing wrapped output to ${wrappedOutputFullPath}`);
        fs.writeFileSync(wrappedOutputFullPath, wrappedOutput);
    }
}

function displayOutput(output: string, outputFormat?: string): void {
    let outputToDisplay: string;
    switch (outputFormat) {
        case "txt":
            outputToDisplay = wordWrapAndTrim(output, 80);
            break;
        case "json":
            outputToDisplay = JSON.stringify(output, null, 2);
            break;
        default:
            outputToDisplay = output;
            break;
    }
    logCompletion(outputToDisplay, true);
}