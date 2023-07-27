export type ParameterOption = {
    option: string;
    description: string;
    default?: string;
    required?: boolean;
};
export type Parameters = {
    description: string;
    options: ParameterOption[];
};
export declare function validateParameters(parameters: Parameters): void;
export declare function readParameters(recipe: string): Parameters;
