import { type RecipeOptionsBase } from "./RecipeOptionsBase";
import { getRecipesFolder } from "./recipes";
import { getStorageFolder } from "./storage";
import { type Models, getModels } from "./models";

let settings: Settings | null = null;

export interface Settings extends Required<RecipeOptionsBase> {
    models: Models;
    recipesFolder: string;
    storageFolder: string;
}

export function getSettings(): Settings {
    if (settings == null) {
        throw new Error("Settings not initialized");
    }
    return settings;
}

export function setSettings(recipeOptionsBase: RecipeOptionsBase): void {
    const recipesFolder = getRecipesFolder();
    const storageFolder = getStorageFolder();

    const verbose: boolean = recipeOptionsBase.verbose ?? false;
    const debug: boolean = recipeOptionsBase.debug ?? false;
    const dryRun: boolean = recipeOptionsBase.dryRun ?? false;
    const showOutput: boolean = recipeOptionsBase.showOutput ?? false;
    const output: string = recipeOptionsBase.output ?? "";
    const outputFormat: string = recipeOptionsBase.outputFormat ?? "txt";
    const modelOverride: string = recipeOptionsBase.modelOverride ?? "";

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
