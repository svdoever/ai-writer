
import * as logger from "loglevel";
import { OpenAIClient } from "@azure/openai";

export type OpenAiCompletionConfiguration = {
    model: string;
    temperature: number;
    max_tokens: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
    stop_sequences: string[];
};

export type OpenAiChatCompletionConfiguration = OpenAiCompletionConfiguration;

export async function openaiExecuteGeneration(openai: OpenAIClient, aiConfiguration: { type: string, completion: OpenAiCompletionConfiguration | OpenAiChatCompletionConfiguration }, prompt: string): Promise<string> {
    switch (aiConfiguration.type) {
        case "completion":
            const completionConfiguration: OpenAiCompletionConfiguration = aiConfiguration.completion;
            return await openaiCompletionGenerator(openai, aiConfiguration.completion, prompt);
        case "chat.completion":
            return await openaiChatCompletionGenerator(openai, aiConfiguration.completion, prompt);
        default:
            throw new Error(`Unknown AI type: ${aiConfiguration.type}, please check your 'models.json' file. Currently supported: completion, chat.completion`);
    }
}

async function openaiCompletionGenerator(openai: OpenAIClient, completionConfiguration: OpenAiCompletionConfiguration, prompt: string): Promise<string> {

    logger.debug(`Generating text for completion with the following configuration: ${JSON.stringify(completionConfiguration, null, 2)}`)

    const result = await openai.getCompletions(completionConfiguration.model, [prompt], completionConfiguration);
    try {
        const generatedText = result.choices[0].text!;
        return generatedText;
    } catch (error) {
        throw new Error(`OpenAI error while generating text for completion: ${completionConfiguration}`);
    }
}

async function openaiChatCompletionGenerator(openai: OpenAIClient, completionConfiguration: OpenAiCompletionConfiguration, prompt: string): Promise<string> {
    const messages = [
        {
            role: "user",
            content: prompt
        }
    ];

    logger.debug(`Generating text for chat completion with the following configuration: ${JSON.stringify(completionConfiguration, null, 2)}`)

    const events = await openai.listChatCompletions(completionConfiguration.model, messages, completionConfiguration);
    if (logger.getLevel() <= logger.levels.DEBUG) {
        process.stdout.write("Completion: ");
    }
    try {
        let generatedText = "";
        for await (const event of events) {
            for (const choice of event.choices) {
                const delta = choice.delta?.content;
                if (delta !== undefined) {
                    if (logger.getLevel() <= logger.levels.DEBUG) {
                        process.stdout.write(delta);
                    }
                    generatedText += delta;
                }
            }
        }
        // the final newline
        logger.info("");
        return generatedText;
    } catch (error) {
        throw new Error(`OpenAI error '${(error as Error).message}' while generating text for completion: ${JSON.stringify(completionConfiguration, null, 2)}`);
    }
}