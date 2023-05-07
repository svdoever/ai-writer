import fs from "fs";
import path from "path";
import * as logger from 'loglevel';

export function showRecipes() {
    if (!fs.existsSync("./recipes")) {
        throw new Error("No 'recipes' folder found");
    }

    // read all directories in folder
    const files = fs.readdirSync("./recipes", { withFileTypes: true });
    const directories = files.filter((file) => file.isDirectory()).filter((file) => file.name !== "lib");

    logger.info("Available recipes:");
    logger.info("===================");
    directories.forEach((directory) => {
        logger.info(`  - ${directory.name}`);
    });
}
export function validateRecipe(recipe: string): void {
    const recipesFolder = process.env.RECIPES_FOLDER!;
    if (!fs.existsSync(recipesFolder)) {
        throw new Error(`No '${recipesFolder}' folder found`);
    }   
    const recipeFolder = path.join(recipesFolder, recipe);
    if (!fs.existsSync(recipeFolder)) {
        throw new Error(`No recipe found for '${recipe}'`);
    }
    const parametersFile = path.join(recipeFolder, "parameters.json");
    if (!fs.existsSync(parametersFile)) {
        throw new Error(`No parameters.json file found for '${recipe}'`);
    }
}