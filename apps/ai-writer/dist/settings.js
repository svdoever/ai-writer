"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSettings = exports.getSettings = void 0;
const recipes_1 = require("./recipes");
const storage_1 = require("./storage");
const models_1 = require("./models");
let settings = null;
function getSettings() {
    if (settings == null) {
        throw new Error("Settings not initialized");
    }
    return settings;
}
exports.getSettings = getSettings;
function setSettings(recipeOptionsBase) {
    var _a, _b, _c, _d, _e, _f, _g;
    const recipesFolder = (0, recipes_1.getRecipesFolder)();
    const storageFolder = (0, storage_1.getStorageFolder)();
    const verbose = (_a = recipeOptionsBase.verbose) !== null && _a !== void 0 ? _a : false;
    const debug = (_b = recipeOptionsBase.debug) !== null && _b !== void 0 ? _b : false;
    const dryRun = (_c = recipeOptionsBase.dryRun) !== null && _c !== void 0 ? _c : false;
    const showOutput = (_d = recipeOptionsBase.showOutput) !== null && _d !== void 0 ? _d : false;
    const output = (_e = recipeOptionsBase.output) !== null && _e !== void 0 ? _e : "";
    const outputFormat = (_f = recipeOptionsBase.outputFormat) !== null && _f !== void 0 ? _f : "txt";
    const modelOverride = (_g = recipeOptionsBase.modelOverride) !== null && _g !== void 0 ? _g : "";
    const models = (0, models_1.getModels)();
    settings = {
        verbose,
        debug,
        dryRun,
        showOutput,
        output,
        outputFormat,
        modelOverride,
        models,
        recipesFolder,
        storageFolder,
    };
}
exports.setSettings = setSettings;
//# sourceMappingURL=settings.js.map