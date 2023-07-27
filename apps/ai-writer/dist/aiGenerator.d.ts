import { ModelConfiguration } from "./providers/ModelConfiguration";
export declare function aiGenerator(recipe: string, prompt: string): Promise<string>;
export declare function getModelConfiguration(recipe: string, modelOverride?: string): ModelConfiguration;
