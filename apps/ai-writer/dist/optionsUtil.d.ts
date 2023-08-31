import { type Parameters } from "./parameters";
export declare function nameWithDashesToCamelCase(name: string): string;
export declare function optionToObjectFieldName(option: string): string;
export declare function enhanceOptions(options: Record<string, string | boolean>, parameters: Parameters): Record<string, string | boolean>;
export declare function expandOptions(options: Record<string, string | boolean>, parameters: Parameters, storageFolder: string): Record<string, string | boolean>;
