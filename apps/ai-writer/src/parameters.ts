import fs from "fs";
import path from "path";
import { getRecipesFolder } from "./recipes";

export interface ParameterOption {
    option: string;
    description?: string;
    default?: string; // only relevant if required is false
    json?: boolean; // false is the default value
    required?: boolean; // false is the default value
}

export interface Parameters {
    description?: string;
    options: ParameterOption[];
}

export function validateParameters(parameters: Parameters): void {
    if (parameters.description == null) {
        throw new Error("No description found in parameters");
    }
    if (parameters.options === undefined || parameters.options.length === 0) {
        throw new Error("No options found in parameters");
    }
    parameters.options.forEach((option) => {
        if (option.option === undefined || option.option.length === 0) {
            throw new Error("No option found in parameters");
        }
        if (option.description === undefined || option.description.length === 0) {
            throw new Error("No description found in parameters");
        }
    });
}

export function readParameters(recipe: string): Parameters {
    const recipesFolder = getRecipesFolder();
    const recipeFolder = path.join(recipesFolder, recipe);
    if (!fs.existsSync(recipeFolder)) {
        throw new Error(`No recipe found for '${recipe}'`);
    }

    const parametersFile = path.join(recipeFolder, "parameters.json");

    const parameterJSON = fs.readFileSync(parametersFile, "utf8");
    const parameters = JSON.parse(parameterJSON);
    validateParameters(parameters);
    return parameters;
}
