import fs from "fs-extra";
import * as logger from "loglevel";
import { OpenAIClient, AzureKeyCredential, OpenAIKeyCredential } from "@azure/openai";
import { getSettings } from "./settings";
import { ModelsConfiguration } from "./providers/ModelsConfiguration";
import { ModelConfiguration } from "./providers/ModelConfiguration";
import { openaiExecuteGeneration } from "./providers/OpenAiProvider";

export async function aiGenerator(recipe: string, prompt: string): Promise<string> {
    const settings = getSettings();

    const modelConfiguration: ModelConfiguration = getModelConfiguration(recipe, settings.modelOverride);
    if (!modelConfiguration) {
        throw new Error(`No model configuration found for recipe: ${recipe}`);
    }

    switch (modelConfiguration.provider) {
        case "OpenAI": {
            if (!process.env.OPENAI_API_KEY) {
                throw new Error(`OPENAI_API_KEY environment variable not set`);
            }
            const apiKey = process.env.OPENAI_API_KEY as string;
            if (!apiKey.startsWith("sk-")) {
                throw new Error(`OPENAI_API_KEY environment variable does not start with 'sk-'`);
            }
            const openAiClient = new OpenAIClient(new OpenAIKeyCredential(apiKey));
            const result = await openaiExecuteGeneration(openAiClient, modelConfiguration, prompt);
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
            const openAiClient = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
            const result = await openaiExecuteGeneration(openAiClient, modelConfiguration, prompt);
            return result;
            break;
        }

        default:
            throw new Error(`Unknown AI provider: ${modelConfiguration.provider}`);
            break;
    }
}



export function getModelConfiguration(recipe: string, modelOverride: string = ""): ModelConfiguration {
    const modelsConfiguration: ModelsConfiguration = fs.readJSONSync("models.json", "utf8");
    let recipeModel = modelOverride;
    if (recipeModel = "") {
        recipeModel =  modelsConfiguration.recipeDefaultModel[recipe];
    }
    if (!recipeModel) {
        logger.info(`Models.json does not contain a default model for recipe ${recipe} - trying general default model`);
        if (!modelsConfiguration.defaultModel) {
            throw new Error(`Models.json does not contain a default model for recipe ${recipe}, and does not contain a general default model as fallback`);
        } else {
            logger.info(`Using general default model ${modelsConfiguration.defaultModel} for recipe ${recipe}`);
            recipeModel = modelsConfiguration.defaultModel;
        }
    } else {
        logger.info(`Using recipe default model ${recipeModel} for recipe ${recipe}`);
    }

    const modelConfiguration = modelsConfiguration.modelConfigurations[recipeModel];
    if (!modelConfiguration) {
        throw new Error(`Models.json does not contain a model configuration for model ${recipeModel}`);
    }

    return modelConfiguration;
}

