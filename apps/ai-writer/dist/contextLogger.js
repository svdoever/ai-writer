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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logCompletion = exports.logConstructedPrompt = exports.logPromptTemplate = exports.logPromptData = exports.logExpandedOptions = exports.logOptions = exports.logRecipe = void 0;
const logger = __importStar(require("loglevel"));
const chalk_1 = __importDefault(require("chalk"));
function logRecipe(recipe) {
    logger.info(`${chalk_1.default.bold.blue("Recipe:")} ${chalk_1.default.blue(recipe)}`);
}
exports.logRecipe = logRecipe;
function logOptions(options) {
    const optionsString = JSON.stringify(options, null, 2);
    logger.info(`${chalk_1.default.bold.blue("Options:")}\n${chalk_1.default.blue(optionsString)}\n`);
}
exports.logOptions = logOptions;
function logExpandedOptions(options) {
    const optionsString = JSON.stringify(options, null, 2);
    logger.debug(`${chalk_1.default.bold.blue("Expanded options (st://... resolved):")}\n${chalk_1.default.blue(optionsString)}\n`);
}
exports.logExpandedOptions = logExpandedOptions;
function logPromptData(promptData) {
    const promptDataString = JSON.stringify(promptData, null, 2);
    logger.info(`${chalk_1.default.bold.blue("Prompt data:")}\n${chalk_1.default.blue(promptDataString)}\n`);
}
exports.logPromptData = logPromptData;
function logPromptTemplate(prompt) {
    logger.info(`${chalk_1.default.bold.gray("Prompt template:")}\n-------------------\n${chalk_1.default.gray(prompt.trim())}\n-------------------\n`);
}
exports.logPromptTemplate = logPromptTemplate;
function logConstructedPrompt(prompt) {
    logger.info(`${chalk_1.default.bold.hex("#FFA500")("Prompt:")}\n-------------------\n${chalk_1.default.hex("#FFA500")(prompt.trim())}\n-------------------\n`);
}
exports.logConstructedPrompt = logConstructedPrompt;
function logCompletion(completion, showForce) {
    const logFunc = showForce ? console.log : logger.info;
    logFunc(`${chalk_1.default.bold.green("Completion:")}\n-------------------\n${chalk_1.default.green(completion)}\n-------------------\n`);
}
exports.logCompletion = logCompletion;
//# sourceMappingURL=contextLogger.js.map