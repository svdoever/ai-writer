export interface OutputFormatConfiguration {
    extension: string;
    wrappedExtension?: string;
    wrapSize?: number;
}
export type OutputFormats = Record<string, OutputFormatConfiguration>;
export declare function getOutputFormats(): OutputFormats;
export declare function getOutputFormat(outputFormats: OutputFormats, outputFormat: string): OutputFormatConfiguration;
export declare function generateOutput(output: string, outputPath: string, outputFormat: string): void;
export declare function displayOutput(output: string, outputFormat?: string): void;
