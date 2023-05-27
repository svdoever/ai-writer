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
exports.scaffoldAiWriterSolution = void 0;
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs-extra"));
const npm_1 = require("./npm");
const packageJson_1 = require("./packageJson");
function scaffoldAiWriterSolution(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const folder = options.folder;
        console.log(`Creating ai-writer solution in folder '${folder}'`);
        const fullPath = path_1.default.join(process.cwd(), folder);
        if (fs.existsSync(fullPath)) {
            throw new Error(`Folder '${folder}' already exists at '${fullPath}', specify a new folder`);
        }
        fs.mkdirSync(fullPath, { recursive: true });
        process.chdir(fullPath);
        // copy all files from aiWriterSolutionTemplate folder as a starter
        const templateFolder = path_1.default.join(__dirname, "../aiWriterSolutionTemplate");
        fs.copySync(templateFolder, fullPath);
        const recipeTemplateFolder = path_1.default.join(__dirname, "../recipes");
        const recipeFolder = path_1.default.join(fullPath, "recipes");
        console.log("Copying starter recipes:");
        copyNonPrivateRecipes(recipeTemplateFolder, recipeFolder);
        (0, packageJson_1.fixPackageJson)((packageJson) => packageJson.name = folder);
        (0, npm_1.npmCommand)("npm install ai-writer --save-dev");
    });
}
exports.scaffoldAiWriterSolution = scaffoldAiWriterSolution;
function copyNonPrivateRecipes(recipeTemplateFolder, recipeFolder) {
    // Check if source exists
    if (!fs.existsSync(recipeTemplateFolder)) {
        console.error(`Recipe template folder does not exist: ${recipeTemplateFolder}`);
        return;
    }
    // Read all items in recipeTemplateFolder
    const recipes = fs.readdirSync(recipeTemplateFolder);
    for (const recipe of recipes) {
        const recipeTemplateFolderPath = path_1.default.join(recipeTemplateFolder, recipe);
        const recipeDestinationPath = path_1.default.join(recipeFolder, recipe);
        const stats = fs.lstatSync(recipeTemplateFolderPath);
        if (stats.isDirectory()) {
            // If directory, check if it starts with underscore and is a "private" recipe
            if (!recipe.startsWith('_')) {
                console.log(`  - ${recipe}`);
                fs.ensureDirSync(recipeDestinationPath);
                fs.copySync(recipeTemplateFolderPath, recipeDestinationPath);
            }
        }
        else if (stats.isFile()) {
            // If it is a file, simply copy it - it is actually not a recipe
            fs.copyFileSync(recipeTemplateFolderPath, recipeDestinationPath);
        }
    }
}
//# sourceMappingURL=scaffoldAiWriterSolution.js.map