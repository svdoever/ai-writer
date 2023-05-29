import fs from "fs";
import path from "path";

export type ParameterOption = {
    option: string;
    description: string;
    default?: string; // only relevant if required is false
    required?: boolean; // false is the default value
}

export type Parameters = {
    description: string;
    options: ParameterOption[];
}

export function validateParameters(parameters: Parameters) {
    if (!parameters.description) {
        throw new Error("No description found in parameters");
    }
    if (!parameters.options) {
        throw new Error("No options found in parameters");
    }
    parameters.options.forEach((option) => {
        if (!option.option) {
            throw new Error("No option found in parameters");
        }
        if (!option.description) {
            throw new Error("No description found in parameters");
        }
    });
}

export function readParameters(recipe: string): Parameters {
    const recipesFolder = process.env.AIWRITER_RECIPES_FOLDER!;
    if (!fs.existsSync(recipesFolder)) {
        throw new Error(`No '${recipesFolder}' folder found`);
    }
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