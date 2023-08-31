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

function getRecipeFolder(recipe: string): string {
    const recipesFolder = getRecipesFolder();
    const recipeFolder = path.join(recipesFolder, recipe);
    return recipeFolder;
}

function validateRecipeFolder(recipe: string, recipeFolder: string): void {
    if (!fs.existsSync(recipeFolder)) {
        throw new Error(`No recipe found for '${recipe}', expected folder at '${recipeFolder}'`);
    }
}

function validateRecipeParameters(recipe: string, recipeFolder: string): void {
    const parametersFile = path.join(recipeFolder, "parameters.json");
    if (!fs.existsSync(parametersFile)) {
        throw new Error(`No parameters.json file found for '${recipe}', expected file at '${parametersFile}'`);
    }
}

async function validateRecipePrompt(recipe: string, recipeFolder: string): Promise<void> {
    const promptFile = path.join(recipeFolder, "prompt.ejs");
    if (!fs.existsSync(promptFile)) {
        throw new Error(`No prompt.ejs file found for '${recipe}', expected file at '${promptFile}'`);
    }

    const prompt = fs.readFileSync(promptFile, "utf8");
    if (prompt.trim().length === 0) {
        throw new Error(`Prompt file '${promptFile}' of recipe '${recipe}' is empty`);
    }
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

export async function validateRecipe(recipe: string): Promise<void> {
    const recipeFolder = getRecipeFolder(recipe);
    validateRecipeFolder(recipe, recipeFolder);
    validateRecipeParameters(recipe, recipeFolder);
    await validateRecipePrompt(recipe, recipeFolder);
}

export function existsRecipe(recipe: string): boolean {
    const recipesFolder = getRecipesFolder();
    const recipeFolder = path.join(recipesFolder, recipe);
    return fs.existsSync(recipeFolder);
}
