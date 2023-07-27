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
function aiGenerator(recipe, prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = (0, settings_1.getSettings)();
        const modelConfiguration = getModelConfiguration(recipe, settings.modelOverride);
        if (!modelConfiguration) {
            throw new Error(`No model configuration found for recipe: ${recipe}`);
        }
        switch (modelConfiguration.provider) {
            case "OpenAI": {
                if (!process.env.OPENAI_API_KEY) {
                    throw new Error(`OPENAI_API_KEY environment variable not set`);
                }
                const apiKey = process.env.OPENAI_API_KEY;
                if (!apiKey.startsWith("sk-")) {
                    throw new Error(`OPENAI_API_KEY environment variable does not start with 'sk-'`);
                }
                const openAiClient = new openai_1.OpenAIClient(new openai_1.OpenAIKeyCredential(apiKey));
                const result = yield (0, OpenAiProvider_1.openaiExecuteGeneration)(openAiClient, modelConfiguration, prompt);
                return result;
                break;
            }
            case "Azure": {
                if (!process.env.AZURE_OPENAI_API_KEY) {
                    throw new Error(`AZURE_OPENAI_API_KEY environment variable not set`);
                }
                if (!process.env.AZURE_OPENAI_ENDPOINT) {
                    throw new Error(`AZURE_OPENAI_ENDPOINT environment variable not set`);
                }
                const apiKey = process.env.AZURE_OPENAI_API_KEY;
                const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
                const openAiClient = new openai_1.OpenAIClient(endpoint, new openai_1.AzureKeyCredential(apiKey));
                const result = yield (0, OpenAiProvider_1.openaiExecuteGeneration)(openAiClient, modelConfiguration, prompt);
                return result;
                break;
            }
            default:
                throw new Error(`Unknown AI provider: ${modelConfiguration.provider}`);
                break;
        }
    });
}
exports.aiGenerator = aiGenerator;
function getModelConfiguration(recipe, modelOverride = "") {
    const modelsConfiguration = fs_extra_1.default.readJSONSync("models.json", "utf8");
    let recipeModel = modelOverride;
    if ((recipeModel = "")) {
        recipeModel = modelsConfiguration.recipeDefaultModel[recipe];
    }
    if (!recipeModel) {
        logger.info(`Models.json does not contain a default model for recipe ${recipe} - trying general default model`);
        if (!modelsConfiguration.defaultModel) {
            throw new Error(`Models.json does not contain a default model for recipe ${recipe}, and does not contain a general default model as fallback`);
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
    if (!modelConfiguration) {
        throw new Error(`Models.json does not contain a model configuration for model ${recipeModel}`);
    }
    return modelConfiguration;
}
exports.getModelConfiguration = getModelConfiguration;
//# sourceMappingURL=aiGenerator.js.map