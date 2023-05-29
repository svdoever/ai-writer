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
exports.getAiConfiguration = exports.aiGeneratorChatCompletion = exports.aiGeneratorCompletion = exports.aiGenerator = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logger = __importStar(require("loglevel"));
const openai_1 = require("openai");
const settings_1 = require("./settings");
function aiGenerator(recipe, prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const settings = (0, settings_1.getSettings)();
        const configuration = new openai_1.Configuration({
            apiKey: settings.openAiApiKey,
        });
        const openai = new openai_1.OpenAIApi(configuration);
        const aiConfiguration = getAiConfiguration(recipe);
        switch (aiConfiguration.type) {
            case "completion":
                const completionConfiguration = aiConfiguration.completion;
                return aiGeneratorCompletion(openai, aiConfiguration.completion, prompt);
            case "chat.completion":
                return aiGeneratorChatCompletion(openai, aiConfiguration.completion, prompt);
            default:
                throw new Error(`Unknown AI type: ${aiConfiguration.type}, please check your aiconfig.json file. Currently supported: completion, chat.completion`);
        }
    });
}
exports.aiGenerator = aiGenerator;
function aiGeneratorCompletion(openai, completionConfiguration, prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const aiCompletionConfigurationWithPrompt = Object.assign(Object.assign({}, completionConfiguration), { prompt });
        logger.debug(`Generating text for completion with the following configuration: ${JSON.stringify(aiCompletionConfigurationWithPrompt, null, 2)}`);
        const response = yield openai.createCompletion(aiCompletionConfigurationWithPrompt);
        try {
            const generatedText = response.data.choices[0].text;
            return generatedText;
        }
        catch (error) {
            throw new Error(`OpenAI error while generating text for completion: ${aiCompletionConfigurationWithPrompt}`);
        }
    });
}
exports.aiGeneratorCompletion = aiGeneratorCompletion;
function aiGeneratorChatCompletion(openai, completionConfiguration, prompt) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const aiChatCompletionConfigurationWithMessages = Object.assign(Object.assign({}, completionConfiguration), { messages: [
                {
                    role: "user",
                    content: prompt
                }
            ] });
        logger.debug(`Generating text for chat completion with the following configuration: ${JSON.stringify(aiChatCompletionConfigurationWithMessages, null, 2)}`);
        const response = yield openai.createChatCompletion(aiChatCompletionConfigurationWithMessages);
        try {
            const generatedText = (_a = response.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
            return generatedText;
        }
        catch (error) {
            throw new Error(`OpenAI error while generating text for completion: ${aiChatCompletionConfigurationWithMessages}`);
        }
    });
}
exports.aiGeneratorChatCompletion = aiGeneratorChatCompletion;
function getAiConfiguration(recipe) {
    const recipesFolder = process.env.AIWRITER_RECIPES_FOLDER;
    const recipeFolder = path_1.default.join(recipesFolder, recipe);
    const aiConfigurationFile = path_1.default.join(recipeFolder, "aiconfig.json");
    const aiConfigurationJSON = fs_1.default.readFileSync(aiConfigurationFile, "utf8");
    let aiConfiguration = JSON.parse(aiConfigurationJSON);
    const settings = (0, settings_1.getSettings)();
    if (settings.modelOverwrite) {
        const modelOverwrite = settings.models[settings.modelOverwrite];
        if (!modelOverwrite) {
            throw new Error(`Model overwrite '${settings.modelOverwrite}' not found in models.json`);
        }
        else {
            aiConfiguration = Object.assign(Object.assign({}, aiConfiguration), modelOverwrite);
        }
    }
    return aiConfiguration;
}
exports.getAiConfiguration = getAiConfiguration;
//# sourceMappingURL=aiGenerator.js.map