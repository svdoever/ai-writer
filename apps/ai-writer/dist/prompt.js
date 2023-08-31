"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enhancePromptDataWithFunctionsIfAvailable = exports.addDataIfAvailable = exports.getPromptForRecipe = exports.renderPrompt = exports.getPromptTemplate = void 0;
const ejs_1 = __importDefault(require("ejs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loglevel_1 = __importDefault(require("loglevel"));
const settings_1 = require("./settings");
const module_from_string_1 = require("module-from-string");
const npm_1 = require("./npm");
const contextLogger_1 = require("./contextLogger");
function getPromptTemplate(recipe) {
    const recipesFolder = (0, settings_1.getSettings)().recipesFolder;
    const recipeFolder = path_1.default.join(recipesFolder, recipe);
    const promptFile = path_1.default.join(recipeFolder, "prompt.ejs");
    const prompt = fs_1.default.readFileSync(promptFile, "utf8");
    return prompt;
}
exports.getPromptTemplate = getPromptTemplate;
function renderPrompt(recipe, promptTemplate, data) {
    let prompt;
    try {
        prompt = ejs_1.default.render(promptTemplate, data);
    }
    catch (error) {
        throw new Error(`Error: recipe '${recipe}', failed to render prompt: ${error.message}`);
    }
    return prompt.trim();
}
exports.renderPrompt = renderPrompt;
function getPromptForRecipe(recipe, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const promptTemplate = getPromptTemplate(recipe);
        const packages = getPackages(recipe);
        yield (0, npm_1.installPackages)(packages);
        data = yield addDataIfAvailable(recipe, data);
        enhancePromptDataWithFunctionsIfAvailable(recipe, data);
        (0, contextLogger_1.logPromptData)(data);
        const prompt = renderPrompt(recipe, promptTemplate, data);
        return prompt;
    });
}
exports.getPromptForRecipe = getPromptForRecipe;
function addDataIfAvailable(recipe, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const recipesFolder = (0, settings_1.getSettings)().recipesFolder;
        const recipeFolder = path_1.default.resolve(path_1.default.join(recipesFolder, recipe));
        const getDataFile = path_1.default.join(recipeFolder, "getData.js");
        if (!fs_1.default.existsSync(getDataFile)) {
            return data;
        }
        const getDataCode = fs_1.default.readFileSync(getDataFile, "utf8");
        const getDataModule = yield (0, module_from_string_1.importFromString)(getDataCode, {
            filename: getDataFile,
            dirname: recipeFolder,
        });
        if (getDataModule.getData === undefined || typeof getDataModule.getData !== "function") {
            throw new Error(`getData function not found in ${getDataFile}`);
        }
        loglevel_1.default.debug(`Found getData function in ${getDataFile}, retrieve data...`);
        const newData = yield getDataModule.getData(data);
        loglevel_1.default.debug(`New data: ${JSON.stringify(newData, null, 2)}`);
        return newData;
    });
}
exports.addDataIfAvailable = addDataIfAvailable;
function enhancePromptDataWithFunctionsIfAvailable(recipe, data) {
    const recipesFolder = (0, settings_1.getSettings)().recipesFolder;
    const recipeFolder = path_1.default.resolve(path_1.default.join(recipesFolder, recipe));
    const recipeFunctionsFile = path_1.default.join(recipeFolder, "functions.js");
    if (!fs_1.default.existsSync(recipeFunctionsFile)) {
        return data;
    }
    loglevel_1.default.debug(`recipe folder: ${recipeFolder}`);
    loglevel_1.default.debug(`Found functions file: ${recipeFunctionsFile}`);
    const functionsCode = fs_1.default.readFileSync(recipeFunctionsFile, "utf8");
    const functions = (0, module_from_string_1.requireFromString)(functionsCode, {
        filename: recipeFunctionsFile,
        dirname: recipeFolder,
    });
    Object.assign(data, functions);
}
exports.enhancePromptDataWithFunctionsIfAvailable = enhancePromptDataWithFunctionsIfAvailable;
function getPackages(recipe) {
    const recipesFolder = (0, settings_1.getSettings)().recipesFolder;
    const recipeFolder = path_1.default.resolve(path_1.default.join(recipesFolder, recipe));
    const recipeDependenciesFile = path_1.default.join(recipeFolder, "dependencies.json");
    if (!fs_1.default.existsSync(recipeDependenciesFile)) {
        return {};
    }
    const packagesJSON = fs_1.default.readFileSync(recipeDependenciesFile, "utf8");
    const packages = JSON.parse(packagesJSON);
    return packages;
}
//# sourceMappingURL=prompt.js.map