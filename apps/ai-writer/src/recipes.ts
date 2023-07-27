import fs from "fs";
import path from "path";
import logger from "loglevel";
import { findProjectRoot } from "./packageJson";

export function getRecipesFolder(): string {
    if (process.env.AIWRITER_RECIPES_FOLDER === undefined) {
        throw new Error("No 'AIWRITER_RECIPES_FOLDER' environment variable found");
    }

    const projectRootFolder = findProjectRoot(process.cwd());
    if (projectRootFolder === null) {
        throw new Error(`Could not find project root, folder ${process.cwd()} is not part of a project`);
    }

    let recipesFolder = path.join(projectRootFolder, process.env.AIWRITER_RECIPES_FOLDER);
    if (!fs.existsSync(recipesFolder)) {
        throw new Error(`No '${recipesFolder}' folder found, expected folder at '${recipesFolder}'`);
    }

    recipesFolder = path.resolve(recipesFolder); // nice absolute path

    return recipesFolder;
}

export function showRecipes(): void {
    const recipeFolder = getRecipesFolder();

    // read all directories in folder
    const files = fs.readdirSync(recipeFolder, { withFileTypes: true });
    const directories = files.filter((file) => file.isDirectory()).filter((file) => file.name !== "lib");

    logger.info("Available recipes:");
    logger.info("===================");
    directories.forEach((directory) => {
        logger.info(`  - ${directory.name}`);
    });
}

export function validateRecipe(recipe: string): void {
    const recipesFolder = getRecipesFolder();
    const recipeFolder = path.join(recipesFolder, recipe);
    if (!fs.existsSync(recipeFolder)) {
        throw new Error(`No recipe found for '${recipe}', expected folder at '${recipeFolder}'`);
    }
    const parametersFile = path.join(recipeFolder, "parameters.json");
    if (!fs.existsSync(parametersFile)) {
        throw new Error(`No parameters.json file found for '${recipe}', expected file at '${parametersFile}'`);
    }
}

export function existsRecipe(recipe: string): boolean {
    const recipesFolder = getRecipesFolder();
    const recipeFolder = path.join(recipesFolder, recipe);
    return fs.existsSync(recipeFolder);
}
