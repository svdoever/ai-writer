import { OpenAiCompletionConfiguration } from "./OpenAiProvider";

export type ModelConfiguration = {
    description: string;
    provider: "OpenAI" | "Azure";
    type: "completion" | "chat.completion";
    completion: OpenAiCompletionConfiguration;
};
