#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import logger from "loglevel";
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
import { findProjectRoot, loadPackageJson, validateNodeVersion } from "./packageJson";
import { logCompletion, logConstructedPrompt, logOptions, logPromptTemplate, logRecipe } from "./contextLogger";
import { getLatestPackageVersion } from "./getLatestPackageVersion";
import { RecipeOptionsBase } from "./RecipeOptionsBase";
import { enhanceOptions } from "./optionsUtil";
import { loadEnv } from "./envUtil";

// we want this type to be available to users of the library
export { RecipeOptionsBase } from "./RecipeOptionsBase";

async function showAIWriterInfo() {
    const packageJson = loadPackageJson();
    logger.info(`AI Writer version: ${packageJson.version}, author: ${packageJson.author.name}, license: ${packageJson.license}`);
    logger.info(packageJson.description + "\n");
    try {
        const latestPublishedVersion = await getLatestPackageVersion(packageJson.name);
        if (latestPublishedVersion !== packageJson.version) {
            logger.warn(`A newer version of AI Writer is available: ${latestPublishedVersion}`);
        }
    } catch (error) {
        logger.warn(`Failed to check for a newer version of AI Writer: ${(error as Error).message}`);
    }
}

export async function executeRecipe<T extends RecipeOptionsBase>(recipe: string, options: T): Promise<string> {
    validateNodeVersion();
    loadEnv();

    if (existsRecipe(recipe)) {
        validateRecipe(recipe);
        const parameters = readParameters(recipe);
        const enhancedOptions: { [key: string]: string | boolean } = enhanceOptions(options as unknown as { [key: string]: string | boolean }, parameters);

        // read global settings from environment variables and command line options
        // use the original options, only general parameters used here
        setSettings(options);
        const settings = getSettings();
        if (settings.verbose || settings.dryRun) {
            logger.setDefaultLevel("info");
        }
        if (settings.debug) {
            logger.setDefaultLevel("debug");
        }
        showAIWriterInfo();
        logRecipe(recipe);
        logOptions(enhancedOptions);
        validateRecipe(recipe);
        const promptTemplate = getPromptTemplate(recipe);
        logPromptTemplate(promptTemplate);
        const prompt = await getPromptForRecipe(recipe, enhancedOptions);
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

        if (options.output && options.output !== "") {
            generateOutput(generatedOutput, path.join(settings.storageFolder, options.output), outputFormat);
        } else {
            logger.info("No output path specified, not writing output to file");
        }

        return generatedOutput;
    } else {
        logger.error(`Recipe '${recipe}' does not exist`);
        showRecipes();
        throw new Error(`Recipe '${recipe}' does not exist`);
    }
}

// Check if this module is being run directly (as a CLI)
if (require.main === module) {
    (async () => {
        try {
            if (process.argv.length < 3) {
                logger.setDefaultLevel("info");
                showAIWriterInfo();
                showRecipes();
            } else {
                const recipe = process.argv[2];
                let program: Command;

                loadEnv();

                if (existsRecipe(recipe)) {
                    validateRecipe(recipe);
                    const parameters = readParameters(recipe);
                    program = createRecipeProgram(recipe, parameters, async (options) => executeRecipe(recipe, options));
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
}

function generateOutput(output: string, outputPath: string, outputFormat: string): void {

    if (!output) {
        throw new Error("No output");
    }

    if (outputPath === "") {
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
