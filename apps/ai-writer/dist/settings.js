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
exports.setSettings = exports.getSettings = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger = __importStar(require("loglevel"));
const packageJson_1 = require("./packageJson");
let settings = null;
function getSettings() {
    if (!settings) {
        throw new Error("Settings not initialized");
    }
    return settings;
}
exports.getSettings = getSettings;
function setSettings(optionsForSettings) {
    const projectRootFolder = (0, packageJson_1.findProjectRoot)(process.cwd());
    if (!projectRootFolder) {
        throw new Error(`Could not find project root, folder ${process.cwd()} is not part of a project`);
    }
    const openAiApiKey = process.env.OPENAI_API_KEY;
    if (!openAiApiKey) {
        throw new Error("No OPENAI_API_KEY environment variable found");
    }
    const recipesFolder = process.env.AIWRITER_RECIPES_FOLDER;
    if (!recipesFolder) {
        throw new Error("No AIWRITER_RECIPES_FOLDER environment variable found");
    }
    const textsOutputFolder = process.env.AIWRITER_STORAGE_FOLDER;
    if (!textsOutputFolder) {
        throw new Error("No AIWRITER_STORAGE_FOLDER environment variable found");
    }
    const dryRun = !!optionsForSettings.dryRun;
    const verbose = !!optionsForSettings.verbose;
    const debug = !!optionsForSettings.debug;
    const showOutput = !!optionsForSettings.showOutput;
    const modelOverwrite = optionsForSettings.modelOverwrite;
    let models = {};
    const modelsOverwriteFile = path_1.default.join(projectRootFolder, "models.json");
    logger.debug(`modelsOverwriteFile: ${modelsOverwriteFile}`);
    if (fs_1.default.existsSync(modelsOverwriteFile)) {
        const modelsJSON = fs_1.default.readFileSync(modelsOverwriteFile, "utf8");
        models = JSON.parse(modelsJSON);
    }
    else {
        throw new Error(`Models file expected at '${modelsOverwriteFile}'`);
    }
    settings = {
        openAiApiKey,
        recipesFolder,
        textsOutputFolder,
        dryRun,
        verbose,
        debug,
        showOutput,
        modelOverwrite,
        models
    };
}
exports.setSettings = setSettings;
//# sourceMappingURL=settings.js.map