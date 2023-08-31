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
exports.getModelConfiguration = exports.aiGenerator = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const logger = __importStar(require("loglevel"));
const openai_1 = require("@azure/openai");
const settings_1 = require("./settings");
const OpenAiProvider_1 = require("./providers/OpenAiProvider");
const path_1 = __importDefault(require("path"));
function aiGenerator(recipe, prompt) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const settings = (0, settings_1.getSettings)();
        const modelConfiguration = getModelConfiguration(recipe, settings.modelOverride);
        if (modelConfiguration === undefined) {
            throw new Error(`No model configuration found for recipe: ${recipe}`);
        }
        switch (modelConfiguration.provider) {
            case "OpenAI": {
                const openaiApiKey = ((_a = process.env.OPENAI_API_KEY) !== null && _a !== void 0 ? _a : "").trim();
                if (openaiApiKey === "") {
                    throw new Error(`OPENAI_API_KEY environment variable not set`);
                }
                if (!openaiApiKey.startsWith("sk-")) {
                    throw new Error(`OPENAI_API_KEY environment variable does not start with 'sk-'`);
                }
                const openAiClient = new openai_1.OpenAIClient(new openai_1.OpenAIKeyCredential(openaiApiKey));
                const result = yield (0, OpenAiProvider_1.openaiExecuteGeneration)(openAiClient, modelConfiguration, prompt);
                return result;
            }
            case "Azure": {
                const azureApiKey = ((_b = process.env.AZURE_OPENAI_API_KEY) !== null && _b !== void 0 ? _b : "").trim();
                const azureEndpoint = ((_c = process.env.AZURE_OPENAI_ENDPOINT) !== null && _c !== void 0 ? _c : "").trim();
                if (azureApiKey === "") {
                    throw new Error(`AZURE_OPENAI_API_KEY environment variable not set`);
                }
                if (azureEndpoint === "") {
                    throw new Error(`AZURE_OPENAI_ENDPOINT environment variable not set`);
                }
                const openAiClient = new openai_1.OpenAIClient(azureEndpoint, new openai_1.AzureKeyCredential(azureApiKey));
                const result = yield (0, OpenAiProvider_1.openaiExecuteGeneration)(openAiClient, modelConfiguration, prompt);
                return result;
            }
            default:
                throw new Error(`Unknown AI provider: ${String(modelConfiguration.provider)}`);
        }
    });
}
exports.aiGenerator = aiGenerator;
function getModelConfiguration(recipe, modelOverride = "") {
    const modelsFullPath = path_1.default.resolve("models.json");
    if (!fs_extra_1.default.existsSync(modelsFullPath)) {
        throw new Error(`No models.json file found, expected file at '${modelsFullPath}'`);
    }
    logger.info(`Reading models.json from ${modelsFullPath}`);
    const modelsConfiguration = fs_extra_1.default.readJSONSync(modelsFullPath, "utf8");
    let recipeModel = modelOverride;
    if (recipeModel === "") {
        recipeModel = modelsConfiguration.recipeDefaultModel[recipe];
    }
    if (recipeModel === undefined) {
        logger.info(`Models.json file ${modelsFullPath} does not contain a default model for recipe ${recipe} - trying general default model`);
        if (modelsConfiguration.defaultModel === undefined) {
            throw new Error(`Models.json file ${modelsFullPath} does not contain a default model for recipe ${recipe}, and does not contain a general default model as fallback`);
        }
        else {
            logger.info(`Using general default model ${modelsConfiguration.defaultModel} for recipe ${recipe}`);
            recipeModel = modelsConfiguration.defaultModel;
        }
    }
    else {
        logger.info(`Using recipe default model ${recipeModel} for recipe ${recipe}`);
    }
    const modelConfiguration = modelsConfiguration.modelConfigurations[recipeModel];
    if (modelConfiguration === undefined) {
        throw new Error(`Models.json does not contain a model configuration for model ${recipeModel}`);
    }
    return modelConfiguration;
}
exports.getModelConfiguration = getModelConfiguration;
//# sourceMappingURL=aiGenerator.js.map