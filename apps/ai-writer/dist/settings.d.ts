import { type RecipeOptionsBase } from "./RecipeOptionsBase";
import { type Models } from "./models";
export interface Settings extends Required<RecipeOptionsBase> {
    models: Models;
    recipesFolder: string;
    storageFolder: string;
}
export declare function getSettings(): Settings;
export declare function setSettings(recipeOptionsBase: RecipeOptionsBase): void;
