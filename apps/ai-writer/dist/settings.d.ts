import { RecipeOptionsBase } from "./RecipeOptionsBase";
export interface Settings extends Required<RecipeOptionsBase> {
    models: {
        [key: string]: unknown;
    };
    recipesFolder: string;
    textsOutputFolder: string;
}
export declare function getSettings(): Settings;
export declare function setSettings(recipeOptionsBase: RecipeOptionsBase): void;
