#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const logger = __importStar(require("loglevel"));
const dotenv_1 = __importDefault(require("dotenv"));
// Exceptions should be reported with code references to the original source
require("source-map-support/register");
const recipes_1 = require("./recipes");
const parameters_1 = require("./parameters");
const commanderUtils_1 = require("./commanderUtils");
const settings_1 = require("./settings");
const aiGenerator_1 = require("./aiGenerator");
const wordWrapAndTrim_1 = require("./wordWrapAndTrim");
const prompt_1 = require("./prompt");
const fileUtil_1 = require("./fileUtil");
const packageJson_1 = require("./packageJson");
const contextLogger_1 = require("./contextLogger");
(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, packageJson_1.validateNodeVersion)();
    // read .env file
    const envPath = (0, packageJson_1.findEnvFile)(process.cwd());
    if (envPath) {
        logger.debug('Found .env file at', envPath);
    }
    else {
        logger.error('Did not find a .env file');
    }
    dotenv_1.default.config({ path: envPath });
    try {
        if (process.argv.length < 3) {
            const packageJson = (0, packageJson_1.loadPackageJson)();
            logger.setDefaultLevel("info");
            logger.info(packageJson.description);
            logger.info(`Version: ${packageJson.version}, author: ${packageJson.author}, license: ${packageJson.license}\n`);
            (0, recipes_1.showRecipes)();
        }
        else {
            const recipe = process.argv[2];
            let program;
            if ((0, recipes_1.existsRecipe)(recipe)) {
                (0, recipes_1.validateRecipe)(recipe);
                const parameters = (0, parameters_1.readParameters)(recipe);
                program = (0, commanderUtils_1.createRecipeProgram)(recipe, parameters, (options) => __awaiter(void 0, void 0, void 0, function* () {
                    (0, settings_1.setSettings)(options); // read global settings from environment variables and command line options
                    const settings = (0, settings_1.getSettings)();
                    if (settings.verbose || settings.dryRun) {
                        logger.setDefaultLevel("info");
                    }
                    if (settings.debug) {
                        logger.setDefaultLevel("debug");
                    }
                    (0, contextLogger_1.logRecipe)(recipe);
                    (0, contextLogger_1.logOptions)(options);
                    (0, recipes_1.validateRecipe)(recipe);
                    const promptTemplate = (0, prompt_1.getPromptTemplate)(recipe);
                    (0, contextLogger_1.logPromptTemplate)(promptTemplate);
                    const prompt = yield (0, prompt_1.getPromptForRecipe)(recipe, options);
                    (0, contextLogger_1.logConstructedPrompt)(prompt);
                    let generatedOutput;
                    if (settings.dryRun) {
                        logger.info("Dry run, not sending prompt to the language model, completion is 'Dry-run completion on prompt:\n<prompt>'\n");
                        generatedOutput = `Dry-run completion on prompt: ${prompt}`;
                    }
                    else {
                        logger.debug("Sending the prompt to the language model");
                        generatedOutput = yield (0, aiGenerator_1.aiGenerator)(recipe, prompt);
                    }
                    const outputFormat = options.outputFormat ? options.outputFormat : "txt";
                    if (settings.showOutput || settings.verbose) {
                        displayOutput(generatedOutput, outputFormat);
                    }
                    generateOutput(generatedOutput, path_1.default.join(settings.textsOutputFolder, options.output), outputFormat);
                }));
            }
            else {
                program = (0, commanderUtils_1.createProgram)();
            }
            program.parse(process.argv);
        }
    }
    catch (error) {
        console.log(`error: ${error}`);
    }
}))();
function generateOutput(output, outputPath, outputFormat) {
    if (!output) {
        throw new Error("No output");
    }
    if (!outputPath) {
        throw new Error("No output path");
    }
    const projectRootFolder = (0, packageJson_1.findProjectRoot)(process.cwd());
    if (!projectRootFolder) {
        throw new Error(`Could not find project root, folder ${process.cwd()} is not part of a project`);
    }
    const outputFormatsJsonPath = path_1.default.join(projectRootFolder, "output-formats.json");
    if (!fs_extra_1.default.existsSync(outputFormatsJsonPath)) {
        throw new Error(`Could not find output-formats.json file in project root ${projectRootFolder}`);
    }
    const outputFormatsJson = fs_extra_1.default.readJsonSync(outputFormatsJsonPath);
    if (!outputFormatsJson[outputFormat]) {
        throw new Error(`Could not find output format '${outputFormat}' in output-formats.json file in project root ${projectRootFolder}`);
    }
    const extension = outputFormatsJson[outputFormat].extension;
    const wrappedExtension = outputFormatsJson[outputFormat].wrappedExtension;
    const wrapSize = outputFormatsJson[outputFormat].wrapSize ? outputFormatsJson[outputFormat].wrapSize : 80;
    const outputFullPath = outputPath + "." + extension;
    (0, fileUtil_1.ensureFolderForFile)(outputFullPath);
    logger.info(`Writing output to ${outputFullPath}`);
    fs_extra_1.default.writeFileSync(outputFullPath, output);
    if (wrappedExtension) {
        const wrappedOutputFullPath = outputPath + "." + wrappedExtension; // wrapped is always assumed text
        const wrappedOutput = (0, wordWrapAndTrim_1.wordWrapAndTrim)(output, wrapSize);
        (0, fileUtil_1.ensureFolderForFile)(wrappedOutputFullPath);
        logger.info(`Writing wrapped output to ${wrappedOutputFullPath}`);
        fs_extra_1.default.writeFileSync(wrappedOutputFullPath, wrappedOutput);
    }
}
function displayOutput(output, outputFormat) {
    let outputToDisplay;
    switch (outputFormat) {
        case "txt":
            outputToDisplay = (0, wordWrapAndTrim_1.wordWrapAndTrim)(output, 80);
            break;
        case "json":
            outputToDisplay = JSON.stringify(output, null, 2);
            break;
        default:
            outputToDisplay = output;
            break;
    }
    (0, contextLogger_1.logCompletion)(outputToDisplay, true);
}
//# sourceMappingURL=index.js.map