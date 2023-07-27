#!/usr/bin/env node
"use strict";
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
exports.executeRecipe = void 0;
const path_1 = __importDefault(require("path"));
const loglevel_1 = __importDefault(require("loglevel"));
// Exceptions should be reported with code references to the original source
require("source-map-support/register");
const recipes_1 = require("./recipes");
const parameters_1 = require("./parameters");
const commanderUtils_1 = require("./commanderUtils");
const settings_1 = require("./settings");
const aiGenerator_1 = require("./aiGenerator");
const prompt_1 = require("./prompt");
const packageJson_1 = require("./packageJson");
const contextLogger_1 = require("./contextLogger");
const getLatestPackageVersion_1 = require("./getLatestPackageVersion");
const optionsUtil_1 = require("./optionsUtil");
const envUtil_1 = require("./envUtil");
const output_1 = require("./output");
function showAIWriterInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const packageJson = (0, packageJson_1.loadPackageJson)();
        loglevel_1.default.info(`AI Writer version: ${packageJson.version}, author: ${packageJson.author.name}, license: ${packageJson.license}`);
        loglevel_1.default.info(packageJson.description + "\n");
        try {
            const latestPublishedVersion = yield (0, getLatestPackageVersion_1.getLatestPackageVersion)(packageJson.name);
            if (latestPublishedVersion !== packageJson.version) {
                loglevel_1.default.warn(`A newer version of AI Writer is available: ${latestPublishedVersion}`);
            }
        }
        catch (error) {
            loglevel_1.default.warn(`Failed to check for a newer version of AI Writer: ${error.message}`);
        }
    });
}
function executeRecipe(recipe, options) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, packageJson_1.validateNodeVersion)();
        (0, envUtil_1.loadEnv)();
        if ((0, recipes_1.existsRecipe)(recipe)) {
            (0, recipes_1.validateRecipe)(recipe);
            const parameters = (0, parameters_1.readParameters)(recipe);
            const enhancedOptions = (0, optionsUtil_1.enhanceOptions)(options, parameters);
            // read global settings from environment variables and command line options
            // use the original options, only general parameters used here
            (0, settings_1.setSettings)(options);
            const settings = (0, settings_1.getSettings)();
            if (settings.verbose || settings.dryRun) {
                loglevel_1.default.setDefaultLevel("info");
            }
            if (settings.debug) {
                loglevel_1.default.setDefaultLevel("debug");
            }
            yield showAIWriterInfo();
            (0, contextLogger_1.logRecipe)(recipe);
            (0, contextLogger_1.logOptions)(enhancedOptions);
            (0, recipes_1.validateRecipe)(recipe);
            const promptTemplate = (0, prompt_1.getPromptTemplate)(recipe);
            (0, contextLogger_1.logPromptTemplate)(promptTemplate);
            const prompt = yield (0, prompt_1.getPromptForRecipe)(recipe, enhancedOptions);
            (0, contextLogger_1.logConstructedPrompt)(prompt);
            let generatedOutput;
            if (settings.dryRun) {
                loglevel_1.default.info("Dry run, not sending prompt to the language model, completion is 'Dry-run completion on prompt:\n<prompt>'\n");
                generatedOutput = `Dry-run completion on prompt: ${prompt}`;
            }
            else {
                loglevel_1.default.debug("Sending the prompt to the language model");
                generatedOutput = yield (0, aiGenerator_1.aiGenerator)(recipe, prompt);
            }
            const outputFormat = options.outputFormat != null ? options.outputFormat : "txt";
            if (settings.showOutput || settings.verbose) {
                (0, output_1.displayOutput)(generatedOutput, outputFormat);
            }
            if (options.output != null && options.output !== "") {
                (0, output_1.generateOutput)(generatedOutput, path_1.default.join(settings.storageFolder, options.output), outputFormat);
            }
            else {
                loglevel_1.default.info("No output path specified, not writing output to file");
            }
            return generatedOutput;
        }
        else {
            loglevel_1.default.error(`Recipe '${recipe}' does not exist`);
            (0, recipes_1.showRecipes)();
            throw new Error(`Recipe '${recipe}' does not exist`);
        }
    });
}
exports.executeRecipe = executeRecipe;
// Check if this module is being run directly (as a CLI)
if (require.main === module) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (process.argv.length < 3) {
                loglevel_1.default.setDefaultLevel("info");
                yield showAIWriterInfo();
                (0, envUtil_1.loadEnv)();
                (0, recipes_1.showRecipes)();
            }
            else {
                const recipe = process.argv[2];
                let program;
                (0, envUtil_1.loadEnv)();
                if ((0, recipes_1.existsRecipe)(recipe)) {
                    (0, recipes_1.validateRecipe)(recipe);
                    const parameters = (0, parameters_1.readParameters)(recipe);
                    program = (0, commanderUtils_1.createRecipeProgram)(recipe, parameters, (options) => __awaiter(void 0, void 0, void 0, function* () {
                        yield executeRecipe(recipe, options);
                    }));
                    program.parse(process.argv);
                }
                else {
                    loglevel_1.default.error(`Recipe '${recipe}' does not exist`);
                    (0, recipes_1.showRecipes)();
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }))();
}
//# sourceMappingURL=index.js.map