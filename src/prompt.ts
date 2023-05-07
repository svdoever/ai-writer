import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import * as logger from "loglevel";
//import { loadModuleResolvedFrom } from 'load-module';
import { getSettings } from './settings';
import {
    requireFromString,
    importFromString,
    importFromStringSync
} from 'module-from-string'

type Packages= {
    [key: string]: string
}

export function getRawPrompt(recipe: string): string {
    const recipesFolder = getSettings().recipesFolder;
    const recipeFolder = path.join(recipesFolder, recipe);
    const promptFile = path.join(recipeFolder, "prompt.ejs");
    const prompt = fs.readFileSync(promptFile, "utf8");
    return prompt;
}

export function renderPrompt(promptTemplate: string, data: any): string {
    const prompt = ejs.render(promptTemplate, data);
    return prompt.trim();
}

export async function getPromptForRecipe(recipe: string, data: any): Promise<string> {
    const promptTemplate = getRawPrompt(recipe);
    const packages = getPackages(recipe);
    await installPackages(packages);
    data = await addDataIfAvailable(recipe, data);
    enhancePromptDataWithFunctionsIfAvailable(recipe, data);
    logger.info(`Prompt data: ${JSON.stringify(data, null, 2)}`);
    const prompt = renderPrompt(promptTemplate, data);
    return prompt;
}

export async function addDataIfAvailable(recipe: string, data: any): Promise<any> {
    const recipesFolder = getSettings().recipesFolder;
    const recipeFolder = path.resolve(path.join(recipesFolder, recipe));
    let getDataFile = path.join(recipeFolder, "getData.js");
    if (!fs.existsSync(getDataFile)) {
        return data;
    }
    const getDataCode = fs.readFileSync(getDataFile, "utf8");
    const getDataModule = await importFromString(getDataCode, {
        filename: getDataFile,
        dirname: recipeFolder
    });

    if (!getDataModule.getData || typeof getDataModule.getData !== "function") {
        throw new Error(`getData function not found in ${getDataFile}`);
    }

    logger.info(`Found getData function in ${getDataFile}, retrieve data...`)
    const newData = await getDataModule.getData(data);
    logger.info(`New data: ${JSON.stringify(newData, null, 2)}`);
    return newData;
}

export function enhancePromptDataWithFunctionsIfAvailable(recipe: string, data: any) {
    const recipesFolder = getSettings().recipesFolder;
    const recipeFolder = path.resolve(path.join(recipesFolder, recipe));
    let recipeFunctionsFile = path.join(recipeFolder, "functions.js");
    if (!fs.existsSync(recipeFunctionsFile)) {
        return data;
    }
    logger.info(`recipe folder: ${recipeFolder}`);
    logger.info(`Found functions file: ${recipeFunctionsFile}`);
    const functionsCode = fs.readFileSync(recipeFunctionsFile, "utf8");
    const functions = requireFromString(
        functionsCode,
        {
            filename: recipeFunctionsFile,
            dirname: recipeFolder
        }
    );
    Object.assign(data, functions);
}

function getPackages(recipe: string): Packages {
    const recipesFolder = getSettings().recipesFolder;
    const recipeFolder = path.resolve(path.join(recipesFolder, recipe));
    let recipeDependenciesFile = path.join(recipeFolder, "dependencies.json");
    if (!fs.existsSync(recipeDependenciesFile)) {
        return {};
    }
    const packagesJSON = fs.readFileSync(recipeDependenciesFile, "utf8");
    const packages = JSON.parse(packagesJSON);
    return packages;
}

async function installPackages(packages: Packages): Promise<void> {
    Object.keys(packages).map(async (packageName) => {
        logger.info(`Installing package ${packageName}`);
        const version = packages[packageName];
        await installPackage(packageName, version);
    });
}

async function installPackage(packageName: string, version: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        // Install the package
        exec(`npm install ${packageName}@${version}`, async (err: Error | null) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
