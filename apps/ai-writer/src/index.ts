#!/usr/bin/env node

import path from "path";
import logger from "loglevel";
import { type Command } from "commander";

// Exceptions should be reported with code references to the original source
import "source-map-support/register";

import { existsRecipe, showRecipes, validateRecipe } from "./recipes";
import { readParameters } from "./parameters";
import { createRecipeProgram } from "./commanderUtils";
import { getSettings, setSettings } from "./settings";
import { aiGenerator } from "./aiGenerator";
import { getPromptForRecipe, getPromptTemplate } from "./prompt";
import { loadPackageJson, validateNodeVersion } from "./packageJson";
import { logConstructedPrompt, logOptions, logPromptTemplate, logRecipe } from "./contextLogger";
import { getLatestPackageVersion } from "./getLatestPackageVersion";
import { type RecipeOptionsBase } from "./RecipeOptionsBase";
import { enhanceOptions } from "./optionsUtil";
import { loadEnv } from "./envUtil";
import { displayOutput, generateOutput } from "./output";

// we want this type to be available to users of the library
export type { RecipeOptionsBase } from "./RecipeOptionsBase";

async function showAIWriterInfo(): Promise<void> {
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
        const enhancedOptions: Record<string, string | boolean> = enhanceOptions(options as unknown as Record<string, string | boolean>, parameters);

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
        await showAIWriterInfo();
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

        const outputFormat = options.outputFormat != null ? options.outputFormat : "txt";

        if (settings.showOutput || settings.verbose) {
            displayOutput(generatedOutput, outputFormat);
        }

        if (options.output != null && options.output !== "") {
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
        try {
            if (process.argv.length < 3) {
                logger.setDefaultLevel("info");
                await showAIWriterInfo();
                showRecipes();
            } else {
                const recipe = process.argv[2];
                let program: Command;

                loadEnv();

                if (existsRecipe(recipe)) {
                    validateRecipe(recipe);
                    const parameters = readParameters(recipe);
                    program = createRecipeProgram(recipe, parameters, async (options) => {
                        await executeRecipe(recipe, options);
                    });
                    program.parse(process.argv);
                } else {
                    logger.error(`Recipe '${recipe}' does not exist`);
                    showRecipes();
                }
            }
        } catch (error) {
            console.log(error);
        }
    })();
}
