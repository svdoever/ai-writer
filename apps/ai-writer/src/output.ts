import fs from "fs-extra";
import path from "path";
import logger from "loglevel";

import { findProjectRoot } from "./packageJson";
import { ensureFolderForFile } from "./fileUtil";
import { wordWrapAndTrim } from "./wordWrapAndTrim";
import { logCompletion } from "./contextLogger";

export interface OutputFormatConfiguration {
    extension: string;
    wrappedExtension?: string;
    wrapSize?: number;
}

export type OutputFormats = Record<string, OutputFormatConfiguration>;

export function getOutputFormats(): OutputFormats {
    const projectRootFolder = findProjectRoot(process.cwd());
    if (projectRootFolder == null) {
        throw new Error(`Could not find project root, folder ${process.cwd()} is not part of a project`);
    }
    const outputFormatsJsonPath = path.join(projectRootFolder, "output-formats.json");
    if (!fs.existsSync(outputFormatsJsonPath)) {
        throw new Error(`Could not find output-formats.json file in project root ${projectRootFolder}`);
    }

    const outputFormats = fs.readJsonSync(outputFormatsJsonPath) as OutputFormats;
    return outputFormats;
}

export function getOutputFormat(outputFormats: OutputFormats, outputFormat: string): OutputFormatConfiguration {
    const outputFormatConfiguration = outputFormats[outputFormat];
    if (outputFormatConfiguration === undefined) {
        throw new Error(`Could not find output format '${outputFormat}' in output-formats.json file in project root`);
    }

    return outputFormatConfiguration;
}

export function generateOutput(output: string, outputPath: string, outputFormat: string): void {
    if (output.length === 0) {
        throw new Error("No output");
    }

    if (outputPath.length === 0) {
        throw new Error("No output path");
    }

    const outputFormats = getOutputFormats();
    const outputFormatConfiguration = getOutputFormat(outputFormats, outputFormat);

    const extension = outputFormatConfiguration.extension;
    const wrappedExtension = outputFormatConfiguration.wrappedExtension;
    const wrapSize = outputFormatConfiguration.wrapSize !== null ? outputFormatConfiguration.wrapSize : 80;

    const outputFullPath = outputPath + "." + extension;
    ensureFolderForFile(outputFullPath);
    logger.info(`Writing output to ${outputFullPath}`);
    fs.writeFileSync(outputFullPath, output);

    if (wrappedExtension != null) {
        const wrappedOutputFullPath = outputPath + "." + wrappedExtension; // wrapped is always assumed text
        const wrappedOutput = wordWrapAndTrim(output, wrapSize);
        ensureFolderForFile(wrappedOutputFullPath);
        logger.info(`Writing wrapped output to ${wrappedOutputFullPath}`);
        fs.writeFileSync(wrappedOutputFullPath, wrappedOutput);
    }
}

export function displayOutput(output: string, outputFormat?: string): void {
    let outputToDisplay: string;
    if (outputFormat === "txt") {
        outputToDisplay = wordWrapAndTrim(output, 80);
    } else if (outputFormat === "json") {
        outputToDisplay = JSON.stringify(output, null, 2);
    } else {
        outputToDisplay = output;
    }
    logCompletion(outputToDisplay, true);
}
