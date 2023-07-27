"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModels = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loglevel_1 = __importDefault(require("loglevel"));
const packageJson_1 = require("./packageJson");
function getModels() {
    const projectRootFolder = (0, packageJson_1.findProjectRoot)(process.cwd());
    if (projectRootFolder == null) {
        throw new Error(`Could not find project root, folder ${process.cwd()} is not part of a project`);
    }
    let models = {};
    const modelsFile = path_1.default.join(projectRootFolder, "models.json");
    loglevel_1.default.debug(`models file: ${modelsFile}`);
    if (fs_1.default.existsSync(modelsFile)) {
        const modelsJSON = fs_1.default.readFileSync(modelsFile, "utf8");
        models = JSON.parse(modelsJSON);
    }
    else {
        throw new Error(`Models file expected at '${modelsFile}'`);
    }
    return models;
}
exports.getModels = getModels;
//# sourceMappingURL=models.js.map