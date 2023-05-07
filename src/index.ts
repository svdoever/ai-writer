#!/usr/bin/env node

import fs from "fs";
import * as logger from "loglevel";

// Exceptions should be reported with code references to the original source
import "source-map-support/register";



// read .env file
import dotenv from "dotenv";
dotenv.config();

import { showRecipes, validateRecipe } from "./recipes";
import path from "path";
import { readParameters } from "./parameters";
import { createProgram } from "./commanderUtils";
import { getSettings, setSettings } from "./settings";
import { aiGenerator } from "./aiGenerator";
import { wordWrapAndTrim } from "./wordWrapAndTrim";
import { getPromptForRecipe } from "./prompt";
import { ensureFolderForFile } from "./fileUtil";

(async () => {
    try {
        if (process.argv.length < 3) {
            logger.setDefaultLevel("info");
            logger.info("AI Writer - AI Assisted Text Writer");
            showRecipes();
        } else {
            const recipe = process.argv[2];
            validateRecipe(recipe);
            const parameters = readParameters(recipe);
            const program = createProgram(parameters, async (options) => {
                setSettings(options); // read global settings from environment variables and command line options
                const settings = getSettings();
                if (settings.verbose || settings.dryRun) {
                    logger.setDefaultLevel("info");
                }
                logger.info(`recipe: ${recipe}`);
                logger.info(`options: ${JSON.stringify(options, null, 2)}`);
                validateRecipe(recipe);
                const prompt = await getPromptForRecipe(recipe, options);
                logger.info(`prompt:\n-------------------\n${prompt}\n-------------------\n`);
                if (settings.dryRun) {
                    logger.info("Dry run, not sending prompt to OpenAI");
                } else {
                    logger.info("Sending prompt to OpenAI");
                    const generatedText = await aiGenerator(recipe, prompt);
                    const generatedtextWrapped = wordWrapAndTrim(generatedText, 80);
                    if (settings.showOutput || settings.verbose) {
                        logger.info(`Resulting text:\n-------------------\n${generatedtextWrapped}\n-------------------\n`);
                    }

                    const outputFile = options.output;
                    if (!outputFile) {
                        throw new Error("No output file specified");
                    } else {
                        const outputPath = path.join(settings.textsOutputFolder, outputFile + ".txt");
                        ensureFolderForFile(outputPath);
                        const wrappedOutputPath = path.join(settings.textsOutputFolder, outputFile + ".wrapped.txt");
                        ensureFolderForFile(wrappedOutputPath);
                        logger.info(`Writing output to ${outputPath}`);
                        if (settings.dryRun) {
                            logger.info("Dry run, not writing output");
                        }
                        else {
                            fs.writeFileSync(outputPath, generatedText);
                            fs.writeFileSync(wrappedOutputPath, generatedtextWrapped);
                        }
                    }
                }
            });
            program.parse(process.argv);
        }
    } catch (error) {
        console.log(`error: ${error}`);
    }
})();
