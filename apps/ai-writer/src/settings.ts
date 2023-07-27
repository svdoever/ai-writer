import { RecipeOptionsBase } from "./RecipeOptionsBase";
import { getRecipesFolder } from "./recipes";
import { getStorageFolder } from "./storage";
import { Models, getModels } from "./models";

let settings: Settings | null = null;

export interface Settings extends Required<RecipeOptionsBase> {
    models: Models;
    recipesFolder: string;
    storageFolder: string;
}

export function getSettings(): Settings {
    if (!settings) {
        throw new Error("Settings not initialized");
    }
    return settings;
}

export function setSettings(recipeOptionsBase: RecipeOptionsBase): void {
    const recipesFolder = getRecipesFolder();
    const storageFolder = getStorageFolder();

    const verbose: boolean = !!recipeOptionsBase.verbose;
    const debug: boolean = !!recipeOptionsBase.debug;
    const dryRun: boolean = !!recipeOptionsBase.dryRun;
    const showOutput: boolean = !!recipeOptionsBase.showOutput;
    const output: string = recipeOptionsBase.output || "";
    const outputFormat: string = recipeOptionsBase.outputFormat || "txt";
    const modelOverride: string  = recipeOptionsBase.modelOverride || "";

    const models = getModels();

    settings = {
        verbose,
        debug,
        dryRun,
        showOutput,
        output,
        outputFormat,
        modelOverride,
        models,
        recipesFolder,
        storageFolder,
    };
}
