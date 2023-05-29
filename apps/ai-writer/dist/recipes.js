"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existsRecipe = exports.validateRecipe = exports.showRecipes = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger = __importStar(require("loglevel"));
function showRecipes() {
    if (!fs_1.default.existsSync("./recipes")) {
        throw new Error("No 'recipes' folder found");
    }
    // read all directories in folder
    const files = fs_1.default.readdirSync("./recipes", { withFileTypes: true });
    const directories = files.filter((file) => file.isDirectory()).filter((file) => file.name !== "lib");
    logger.info("Available recipes:");
    logger.info("===================");
    directories.forEach((directory) => {
        logger.info(`  - ${directory.name}`);
    });
}
exports.showRecipes = showRecipes;
function validateRecipe(recipe) {
    if (process.env.AIWRITER_RECIPES_FOLDER === undefined) {
        throw new Error("No 'AIWRITER_RECIPES_FOLDER' environment variable found");
    }
    const recipesFolder = process.env.AIWRITER_RECIPES_FOLDER;
    if (!fs_1.default.existsSync(recipesFolder)) {
        throw new Error(`No '${recipesFolder}' folder found, expected folder at '${recipesFolder}'`);
    }
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
    if (process.env.AIWRITER_RECIPES_FOLDER === undefined) {
        throw new Error("No 'AIWRITER_RECIPES_FOLDER' environment variable found");
    }
    const recipesFolder = process.env.AIWRITER_RECIPES_FOLDER;
    if (!fs_1.default.existsSync(recipesFolder)) {
        throw new Error(`No '${recipesFolder}' folder found, expected folder at '${recipesFolder}'`);
    }
    const recipeFolder = path_1.default.join(recipesFolder, recipe);
    return fs_1.default.existsSync(recipeFolder);
}
exports.existsRecipe = existsRecipe;
//# sourceMappingURL=recipes.js.map