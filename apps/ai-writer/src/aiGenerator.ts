import fs from "fs-extra";
import * as logger from "loglevel";
import { OpenAIClient, AzureKeyCredential, OpenAIKeyCredential } from "@azure/openai";
import { getSettings } from "./settings";
import { type ModelsConfiguration } from "./providers/ModelsConfiguration";
import { type ModelConfiguration } from "./providers/ModelConfiguration";
import { openaiExecuteGeneration } from "./providers/OpenAiProvider";
import path from "path";

export async function aiGenerator(recipe: string, prompt: string): Promise<string> {
    const settings = getSettings();

    const modelConfiguration: ModelConfiguration = getModelConfiguration(recipe, settings.modelOverride);
    if (modelConfiguration === undefined) {
        throw new Error(`No model configuration found for recipe: ${recipe}`);
    }

    switch (modelConfiguration.provider) {
        case "OpenAI": {
            const openaiApiKey = (process.env.OPENAI_API_KEY ?? "").trim();
            if (openaiApiKey === "") {
                throw new Error(`OPENAI_API_KEY environment variable not set`);
            }
            if (!openaiApiKey.startsWith("sk-")) {
                throw new Error(`OPENAI_API_KEY environment variable does not start with 'sk-'`);
            }
            const openAiClient = new OpenAIClient(new OpenAIKeyCredential(openaiApiKey));
            const result = await openaiExecuteGeneration(openAiClient, modelConfiguration, prompt);
            return result;
        }

        case "Azure": {
            const azureApiKey = (process.env.AZURE_OPENAI_API_KEY ?? "").trim();
            const azureEndpoint = (process.env.AZURE_OPENAI_ENDPOINT ?? "").trim();
            if (azureApiKey === "") {
                throw new Error(`AZURE_OPENAI_API_KEY environment variable not set`);
            }
            if (azureEndpoint === "") {
                throw new Error(`AZURE_OPENAI_ENDPOINT environment variable not set`);
            }

            const openAiClient = new OpenAIClient(azureEndpoint, new AzureKeyCredential(azureApiKey));
            const result = await openaiExecuteGeneration(openAiClient, modelConfiguration, prompt);
            return result;
        }

        default:
            throw new Error(`Unknown AI provider: ${String(modelConfiguration.provider)}`);
    }
}

export function getModelConfiguration(recipe: string, modelOverride: string = ""): ModelConfiguration {
    const modelsFullPath = path.resolve("models.json");
    if (!fs.existsSync(modelsFullPath)) {
        throw new Error(`No models.json file found, expected file at '${modelsFullPath}'`);
    }
    logger.info(`Reading models.json from ${modelsFullPath}`);

    const modelsConfiguration: ModelsConfiguration = fs.readJSONSync(modelsFullPath, "utf8");
    let recipeModel = modelOverride;
    if (recipeModel === "") {
        recipeModel = modelsConfiguration.recipeDefaultModel[recipe];
    }
    if (recipeModel === undefined) {
        logger.info(`Models.json file ${modelsFullPath} does not contain a default model for recipe ${recipe} - trying general default model`);
        if (modelsConfiguration.defaultModel === undefined) {
            throw new Error(
                `Models.json file ${modelsFullPath} does not contain a default model for recipe ${recipe}, and does not contain a general default model as fallback`
            );
        } else {
            logger.info(`Using general default model ${modelsConfiguration.defaultModel} for recipe ${recipe}`);
            recipeModel = modelsConfiguration.defaultModel;
        }
    } else {
        logger.info(`Using recipe default model ${recipeModel} for recipe ${recipe}`);
    }

    const modelConfiguration = modelsConfiguration.modelConfigurations[recipeModel];
    if (modelConfiguration === undefined) {
        throw new Error(`Models.json does not contain a model configuration for model ${recipeModel}`);
    }

    return modelConfiguration;
}
