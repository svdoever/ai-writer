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
export declare function openaiExecuteGeneration(openai: OpenAIClient, aiConfiguration: {
    type: string;
    completion: OpenAiCompletionConfiguration | OpenAiChatCompletionConfiguration;
}, prompt: string): Promise<string>;
