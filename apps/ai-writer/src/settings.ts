import fs from "fs";
import path from "path";
import * as logger from "loglevel";
import { findProjectRoot } from "./packageJson";


let settings: Settings | null = null;

export type Settings = {
    recipesFolder: string;
    textsOutputFolder: string;
    dryRun: boolean;
    verbose: boolean;
    debug: boolean;
    showOutput: boolean;
    modelOverride?: string;
    models: { [key: string]: unknown };
}

export type OptionsForSettings = {
    dryRun?: boolean;
    verbose?: boolean;
    debug?: boolean;
    showOutput?: boolean;
    modelOverride?: string;
}

export function getSettings() {
    if (!settings) {
        throw new Error("Settings not initialized");
    }
    return settings;
}

export function setSettings(optionsForSettings: OptionsForSettings): void {
    const projectRootFolder = findProjectRoot(process.cwd());
    if (!projectRootFolder) {
        throw new Error(`Could not find project root, folder ${process.cwd()} is not part of a project`);
    }

    const openAiApiKey = process.env.OPENAI_API_KEY;
    if (!openAiApiKey) {
        throw new Error("No OPENAI_API_KEY environment variable found");
    }
    const recipesFolder = process.env.AIWRITER_RECIPES_FOLDER;
    if (!recipesFolder) {
        throw new Error("No AIWRITER_RECIPES_FOLDER environment variable found");
    }
    const textsOutputFolder = process.env.AIWRITER_STORAGE_FOLDER;
    if (!textsOutputFolder) {
        throw new Error("No AIWRITER_STORAGE_FOLDER environment variable found");
    }

    const dryRun: boolean = !!optionsForSettings.dryRun;
    const verbose: boolean = !!optionsForSettings.verbose;
    const debug: boolean = !!optionsForSettings.debug;
    const showOutput: boolean = !!optionsForSettings.showOutput;
    const modelOverride: string | undefined = optionsForSettings.modelOverride;

    let models: { [key: string]: unknown } = {};
    const modelsFile = path.join(projectRootFolder, "models.json");
    logger.debug(`models file: ${modelsFile}`);
    if (fs.existsSync(modelsFile)) {
        const modelsJSON = fs.readFileSync(modelsFile, "utf8");
        models = JSON.parse(modelsJSON);
    } else {
        throw new Error(`Models file expected at '${modelsFile}'`);
    }

    settings = {
        recipesFolder,
        textsOutputFolder,
        dryRun,
        verbose,
        debug,
        showOutput,
        modelOverride,
        models
    };
}
