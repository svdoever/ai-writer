"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existsRecipe = exports.validateRecipe = exports.showRecipes = exports.getRecipesFolder = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loglevel_1 = __importDefault(require("loglevel"));
const packageJson_1 = require("./packageJson");
function getRecipesFolder() {
    if (process.env.AIWRITER_RECIPES_FOLDER === undefined) {
        throw new Error("No 'AIWRITER_RECIPES_FOLDER' environment variable found");
    }
    const projectRootFolder = (0, packageJson_1.findProjectRoot)(process.cwd());
    if (projectRootFolder === null) {
        throw new Error(`Could not find project root, folder ${process.cwd()} is not part of a project`);
    }
    let recipesFolder = path_1.default.join(projectRootFolder, process.env.AIWRITER_RECIPES_FOLDER);
    if (!fs_1.default.existsSync(recipesFolder)) {
        throw new Error(`No '${recipesFolder}' folder found, expected folder at '${recipesFolder}'`);
    }
    recipesFolder = path_1.default.resolve(recipesFolder); // nice absolute path
    return recipesFolder;
}
exports.getRecipesFolder = getRecipesFolder;
function showRecipes() {
    const recipeFolder = getRecipesFolder();
    // read all directories in folder
    const files = fs_1.default.readdirSync(recipeFolder, { withFileTypes: true });
    const directories = files.filter((file) => file.isDirectory()).filter((file) => file.name !== "lib");
    loglevel_1.default.info("Available recipes:");
    loglevel_1.default.info("===================");
    directories.forEach((directory) => {
        loglevel_1.default.info(`  - ${directory.name}`);
    });
}
exports.showRecipes = showRecipes;
function validateRecipe(recipe) {
    const recipesFolder = getRecipesFolder();
    const recipeFolder = path_1.default.join(recipesFolder, recipe);
    if (!fs_1.default.existsSync(recipeFolder)) {
        throw new Error(`No recipe found for '${recipe}', expected folder at '${recipeFolder}'`);
    }
    const parametersFile = path_1.default.join(recipeFolder, "parameters.json");
    if (!fs_1.default.existsSync(parametersFile)) {
        throw new Error(`No parameters.json file found for '${recipe}', expected file at '${parametersFile}'`);
    }
}
exports.validateRecipe = validateRecipe;
function existsRecipe(recipe) {
    const recipesFolder = getRecipesFolder();
    const recipeFolder = path_1.default.join(recipesFolder, recipe);
    return fs_1.default.existsSync(recipeFolder);
}
exports.existsRecipe = existsRecipe;
//# sourceMappingURL=recipes.js.map