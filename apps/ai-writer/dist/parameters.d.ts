export interface ParameterOption {
    option: string;
    description?: string;
    default?: string;
    json?: boolean;
    required?: boolean;
}
export interface Parameters {
    description?: string;
    options: ParameterOption[];
}
export declare function validateParameters(parameters: Parameters): void;
export declare function readParameters(recipe: string): Parameters;
