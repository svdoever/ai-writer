import path from "path";
import * as fs from 'fs-extra';
import { npmCommand } from "./npm";
import { Z_FIXED } from "zlib";

export type AiWriterSolutionOptions = {
    folder: string;
}

export async function scaffoldAiWriterSolution(options: AiWriterSolutionOptions): Promise<void> {
    const folder = options.folder;
    console.log(`Creating ai-writer solution in folder '${folder}'`);
    const fullPath = path.join(process.cwd(), folder);
    if (fs.existsSync(fullPath)) {
        throw new Error(`Folder '${folder}' already exists at '${fullPath}', specify a new folder`);
    }
    fs.mkdirSync(fullPath, {recursive: true});
    process.chdir(fullPath);

    // copy all files from aiWriterSolutionTemplate folder as a starter
    const templateFolder = path.join(__dirname, "../aiWriterSolutionTemplate");
    fs.copySync(templateFolder, fullPath);
    const recipeTemplateFolder = path.join(__dirname, "../recipes");
    const recipeFolder = path.join(fullPath, "recipes");
    console.log("Copying starter recipes:");
    copyNonPrivateRecipes(recipeTemplateFolder, recipeFolder);
    fixPackageJson(path.join(fullPath, "package.json"));
    npmCommand("npm install ai-writer --save-dev");
}

function copyNonPrivateRecipes(recipeTemplateFolder: string, recipeFolder: string) {
      // Check if source exists
  if (!fs.existsSync(recipeTemplateFolder)) {
    console.error(`Recipe template folder does not exist: ${recipeTemplateFolder}`);
    return;
  }

  // Read all items in recipeTemplateFolder
  const recipes = fs.readdirSync(recipeTemplateFolder);

  for (const recipe of recipes) {
    const recipeTemplateFolderPath = path.join(recipeTemplateFolder, recipe);
    const recipeDestinationPath = path.join(recipeFolder, recipe);

    const stats = fs.lstatSync(recipeTemplateFolderPath);

    if (stats.isDirectory()) {
      // If directory, check if it starts with underscore and is a "private" recipe
      if (!recipe.startsWith('_')) {
        console.log(`  - ${recipe}`)
        fs.ensureDirSync(recipeDestinationPath);
        fs.copySync(recipeTemplateFolderPath, recipeDestinationPath);
      }
    } else if (stats.isFile()) {
      // If it is a file, simply copy it - it is actually not a recipe
      fs.copyFileSync(recipeTemplateFolderPath, recipeDestinationPath);
    }
  }
}

function fixPackageJson(packageJsonPath: string) {
    const packageJson = fs.readJsonSync(packageJsonPath);
    packageJson.name = path.basename(process.cwd());
    fs.writeJsonSync(packageJsonPath, packageJson, {spaces: 2});
}


