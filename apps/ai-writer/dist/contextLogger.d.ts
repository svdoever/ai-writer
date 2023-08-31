export declare function logRecipe(recipe: string): void;
export declare function logOptions(options: {
    [key: string]: string | boolean;
}): void;
export declare function logExpandedOptions(options: {
    [key: string]: string | boolean;
}): void;
export declare function logPromptData(promptData: unknown): void;
export declare function logPromptTemplate(prompt: string): void;
export declare function logConstructedPrompt(prompt: string): void;
export declare function logCompletion(completion: string, showForce: boolean): void;
