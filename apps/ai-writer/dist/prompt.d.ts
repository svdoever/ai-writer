export declare function getPromptTemplate(recipe: string): string;
export declare function renderPrompt(promptTemplate: string, data: any): string;
export declare function getPromptForRecipe(recipe: string, data: any): Promise<string>;
export declare function addDataIfAvailable(recipe: string, data: any): Promise<any>;
export declare function enhancePromptDataWithFunctionsIfAvailable(recipe: string, data: any): any;
