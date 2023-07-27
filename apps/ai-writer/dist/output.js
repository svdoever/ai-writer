"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayOutput = exports.generateOutput = exports.getOutputFormat = exports.getOutputFormats = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const loglevel_1 = __importDefault(require("loglevel"));
const packageJson_1 = require("./packageJson");
const fileUtil_1 = require("./fileUtil");
const wordWrapAndTrim_1 = require("./wordWrapAndTrim");
const contextLogger_1 = require("./contextLogger");
function getOutputFormats() {
    const projectRootFolder = (0, packageJson_1.findProjectRoot)(process.cwd());
    if (projectRootFolder == null) {
        throw new Error(`Could not find project root, folder ${process.cwd()} is not part of a project`);
    }
    const outputFormatsJsonPath = path_1.default.join(projectRootFolder, "output-formats.json");
    if (!fs_extra_1.default.existsSync(outputFormatsJsonPath)) {
        throw new Error(`Could not find output-formats.json file in project root ${projectRootFolder}`);
    }
    const outputFormats = fs_extra_1.default.readJsonSync(outputFormatsJsonPath);
    return outputFormats;
}
exports.getOutputFormats = getOutputFormats;
function getOutputFormat(outputFormats, outputFormat) {
    const outputFormatConfiguration = outputFormats[outputFormat];
    if (outputFormatConfiguration === undefined) {
        throw new Error(`Could not find output format '${outputFormat}' in output-formats.json file in project root`);
    }
    return outputFormatConfiguration;
}
exports.getOutputFormat = getOutputFormat;
function generateOutput(output, outputPath, outputFormat) {
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
    (0, fileUtil_1.ensureFolderForFile)(outputFullPath);
    loglevel_1.default.info(`Writing output to ${outputFullPath}`);
    fs_extra_1.default.writeFileSync(outputFullPath, output);
    if (wrappedExtension != null) {
        const wrappedOutputFullPath = outputPath + "." + wrappedExtension; // wrapped is always assumed text
        const wrappedOutput = (0, wordWrapAndTrim_1.wordWrapAndTrim)(output, wrapSize);
        (0, fileUtil_1.ensureFolderForFile)(wrappedOutputFullPath);
        loglevel_1.default.info(`Writing wrapped output to ${wrappedOutputFullPath}`);
        fs_extra_1.default.writeFileSync(wrappedOutputFullPath, wrappedOutput);
    }
}
exports.generateOutput = generateOutput;
function displayOutput(output, outputFormat) {
    let outputToDisplay;
    if (outputFormat === "txt") {
        outputToDisplay = (0, wordWrapAndTrim_1.wordWrapAndTrim)(output, 80);
    }
    else if (outputFormat === "json") {
        outputToDisplay = JSON.stringify(output, null, 2);
    }
    else {
        outputToDisplay = output;
    }
    (0, contextLogger_1.logCompletion)(outputToDisplay, true);
}
exports.displayOutput = displayOutput;
//# sourceMappingURL=output.js.map