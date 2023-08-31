import ejs from "ejs";
import fs from "fs";
import path from "path";
import logger from "loglevel";
import { getSettings } from "./settings";
import { requireFromString, importFromString } from "module-from-string";
import { type Packages, installPackages } from "./npm";
import { logPromptData } from "./contextLogger";

export function getPromptTemplate(recipe: string): string {
    const recipesFolder = getSettings().recipesFolder;
    const recipeFolder = path.join(recipesFolder, recipe);
    const promptFile = path.join(recipeFolder, "prompt.ejs");
    const prompt = fs.readFileSync(promptFile, "utf8");
    return prompt;
}

export function renderPrompt(recipe: string, promptTemplate: string, data: any): string {
    let prompt: string;
    try {
        prompt = ejs.render(promptTemplate, data);
    } catch (error) {
        throw new Error(`Error: recipe '${recipe}', failed to render prompt: ${(error as Error).message}`);
    }
    return prompt.trim();
}

export async function getPromptForRecipe(recipe: string, data: any): Promise<string> {
    const promptTemplate = getPromptTemplate(recipe);

    const packages = getPackages(recipe);
    await installPackages(packages);
    data = await addDataIfAvailable(recipe, data);
    enhancePromptDataWithFunctionsIfAvailable(recipe, data);
    logPromptData(data);
    const prompt = renderPrompt(recipe, promptTemplate, data);
    return prompt;
}

export async function addDataIfAvailable(recipe: string, data: any): Promise<any> {
    const recipesFolder = getSettings().recipesFolder;
    const recipeFolder = path.resolve(path.join(recipesFolder, recipe));
    const getDataFile = path.join(recipeFolder, "getData.js");
    if (!fs.existsSync(getDataFile)) {
        return data;
    }
    const getDataCode = fs.readFileSync(getDataFile, "utf8");
    const getDataModule = await importFromString(getDataCode, {
        filename: getDataFile,
        dirname: recipeFolder,
    });

    if (getDataModule.getData === undefined || typeof getDataModule.getData !== "function") {
        throw new Error(`getData function not found in ${getDataFile}`);
    }

    logger.debug(`Found getData function in ${getDataFile}, retrieve data...`);
    const newData = await getDataModule.getData(data);
    logger.debug(`New data: ${JSON.stringify(newData, null, 2)}`);
    return newData;
}

export function enhancePromptDataWithFunctionsIfAvailable(recipe: string, data: any): void {
    const recipesFolder = getSettings().recipesFolder;
    const recipeFolder = path.resolve(path.join(recipesFolder, recipe));
    const recipeFunctionsFile = path.join(recipeFolder, "functions.js");
    if (!fs.existsSync(recipeFunctionsFile)) {
        return data;
    }
    logger.debug(`recipe folder: ${recipeFolder}`);
    logger.debug(`Found functions file: ${recipeFunctionsFile}`);
    const functionsCode = fs.readFileSync(recipeFunctionsFile, "utf8");
    const functions = requireFromString(functionsCode, {
        filename: recipeFunctionsFile,
        dirname: recipeFolder,
    });
    Object.assign(data, functions);
}

function getPackages(recipe: string): Packages {
    const recipesFolder = getSettings().recipesFolder;
    const recipeFolder = path.resolve(path.join(recipesFolder, recipe));
    const recipeDependenciesFile = path.join(recipeFolder, "dependencies.json");
    if (!fs.existsSync(recipeDependenciesFile)) {
        return {};
    }
    const packagesJSON = fs.readFileSync(recipeDependenciesFile, "utf8");
    const packages = JSON.parse(packagesJSON);
    return packages;
}
