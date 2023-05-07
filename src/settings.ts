import fs from "fs";
import path from "path";
import * as logger from "loglevel";


let settings: Settings | null = null;

export type Settings = {
    openAiApiKey: string;
    recipesFolder: string;
    textsOutputFolder: string;
    dryRun: boolean;
    verbose: boolean;
    showOutput: boolean;
    modelOverwrite?: string;
    models: { [key: string]: unknown };
}

export type OptionsForSettings = {
    dryRun?: boolean;
    verbose?: boolean;
    showOutput?: boolean;
    modelOverwrite?: string;
}

export function getSettings() {
    if (!settings) {
        throw new Error("Settings not initialized");
    }
    return settings;
}

export function setSettings(optionsForSettings: OptionsForSettings): void {
    const openAiApiKey = process.env.OPENAI_API_KEY;
    if (!openAiApiKey) {
        throw new Error("No OPENAI_API_KEY environment variable found");
    }
    const recipesFolder = process.env.RECIPES_FOLDER;
    if (!recipesFolder) {
        throw new Error("No RECIPES_FOLDER environment variable found");
    }
    const textsOutputFolder = process.env.TEXTS_OUTPUT_FOLDER;
    if (!textsOutputFolder) {
        throw new Error("No TEXTS_OUTPUT_FOLDER environment variable found");
    }

    const dryRun: boolean = !!optionsForSettings.dryRun;
    const verbose: boolean = !!optionsForSettings.verbose;
    const showOutput: boolean = !!optionsForSettings.showOutput;
    const modelOverwrite: string | undefined = optionsForSettings.modelOverwrite;

    let models: { [key: string]: unknown } = {};
    const modelsOverwriteFile = path.join(__dirname, "../models.json");
    logger.info(`modelsOverwriteFile: ${modelsOverwriteFile}`);
    if (fs.existsSync(modelsOverwriteFile)) {
        const modelsJSON = fs.readFileSync(modelsOverwriteFile, "utf8");
        models = JSON.parse(modelsJSON);
    } else {
        throw new Error(`Models file expected at '${modelsOverwriteFile}'`);
    }

    settings = {
        openAiApiKey,
        recipesFolder,
        textsOutputFolder,
        dryRun,
        verbose,
        showOutput,
        modelOverwrite,
        models
    };
}
