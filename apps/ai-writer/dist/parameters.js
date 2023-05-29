"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readParameters = exports.validateParameters = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function validateParameters(parameters) {
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
exports.validateParameters = validateParameters;
function readParameters(recipe) {
    const recipesFolder = process.env.AIWRITER_RECIPES_FOLDER;
    if (!fs_1.default.existsSync(recipesFolder)) {
        throw new Error(`No '${recipesFolder}' folder found`);
    }
    const recipeFolder = path_1.default.join(recipesFolder, recipe);
    if (!fs_1.default.existsSync(recipeFolder)) {
        throw new Error(`No recipe found for '${recipe}'`);
    }
    const parametersFile = path_1.default.join(recipeFolder, "parameters.json");
    const parameterJSON = fs_1.default.readFileSync(parametersFile, "utf8");
    const parameters = JSON.parse(parameterJSON);
    validateParameters(parameters);
    return parameters;
}
exports.readParameters = readParameters;
//# sourceMappingURL=parameters.js.map