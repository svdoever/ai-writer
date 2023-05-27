import path from "path";
import fs from "fs";
import * as logger from "loglevel";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { getSettings } from "./settings";

export type AiCompletionConfiguration = {
    model: string;
    temperature: number;
    max_tokens: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
    stop_sequences: string[];
}

export type AiCompletionConfigurationWithPrompt = AiCompletionConfiguration & {
    prompt: string;
}

export type AiChatCompletionConfiguration = AiCompletionConfiguration;

export type AiChatCompletionConfigurationWithMessages = AiChatCompletionConfiguration & {
    messages: Array<ChatCompletionRequestMessage>;
}

export async function aiGenerator(recipe: string, prompt: string): Promise<string> {
    const settings = getSettings();
    const configuration = new Configuration({
        apiKey: settings.openAiApiKey,
    });
    const openai = new OpenAIApi(configuration);

    const aiConfiguration: { type: string, completion: AiCompletionConfiguration | AiChatCompletionConfiguration } = getAiConfiguration(recipe);
    switch (aiConfiguration.type) {
        case "completion":
            const completionConfiguration: AiCompletionConfiguration = aiConfiguration.completion;
            return aiGeneratorCompletion(openai, aiConfiguration.completion, prompt);
        case "chat.completion":
            return aiGeneratorChatCompletion(openai, aiConfiguration.completion, prompt);
        default:
            throw new Error(`Unknown AI type: ${aiConfiguration.type}, please check your aiconfig.json file. Currently supported: completion, chat.completion`);
    }
}

export async function aiGeneratorCompletion(openai: OpenAIApi, completionConfiguration: AiCompletionConfiguration, prompt: string): Promise<string> {
    const aiCompletionConfigurationWithPrompt: AiCompletionConfigurationWithPrompt = { ...completionConfiguration, prompt };

    logger.debug(`Generating text for completion with the following configuration: ${JSON.stringify(aiCompletionConfigurationWithPrompt, null, 2)}`)

    const response = await openai.createCompletion(aiCompletionConfigurationWithPrompt);
    try {
        const generatedText = response.data.choices[0].text!;
        return generatedText;
    } catch (error) {
        throw new Error(`OpenAI error while generating text for completion: ${aiCompletionConfigurationWithPrompt}`);
    }
}

export async function aiGeneratorChatCompletion(openai: OpenAIApi, completionConfiguration: AiCompletionConfiguration, prompt: string): Promise<string> {
    const aiChatCompletionConfigurationWithMessages: AiChatCompletionConfigurationWithMessages = {
        ...completionConfiguration,
        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    };

    logger.debug(`Generating text for chat completion with the following configuration: ${JSON.stringify(aiChatCompletionConfigurationWithMessages, null, 2)}`)

    const response = await openai.createChatCompletion(aiChatCompletionConfigurationWithMessages);
    try {
        const generatedText = response.data.choices[0].message?.content!;
        return generatedText;
    } catch (error) {
        throw new Error(`OpenAI error while generating text for completion: ${aiChatCompletionConfigurationWithMessages}`);
    }
}
export function getAiConfiguration(recipe: string): any {
    const recipesFolder = process.env.RECIPES_FOLDER!;
    const recipeFolder = path.join(recipesFolder, recipe);
    const aiConfigurationFile = path.join(recipeFolder, "aiconfig.json");
    const aiConfigurationJSON = fs.readFileSync(aiConfigurationFile, "utf8");
    let aiConfiguration = JSON.parse(aiConfigurationJSON);

    const settings = getSettings();
    if (settings.modelOverwrite) {
        const modelOverwrite = settings.models[settings.modelOverwrite];
        if (!modelOverwrite) {
            throw new Error(`Model overwrite '${settings.modelOverwrite}' not found in models.json`);
        } else {
            aiConfiguration = { ...aiConfiguration, ...modelOverwrite };
        }
    }
    return aiConfiguration;
}
