"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorageFolder = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const packageJson_1 = require("./packageJson");
function getStorageFolder() {
    if (process.env.AIWRITER_STORAGE_FOLDER === undefined) {
        throw new Error("No 'AIWRITER_STORAGE_FOLDER' environment variable found");
    }
    const projectRootFolder = (0, packageJson_1.findProjectRoot)(process.cwd());
    if (projectRootFolder === null) {
        throw new Error(`Could not find project root, folder ${process.cwd()} is not part of a project`);
    }
    let storageFolder = path_1.default.join(projectRootFolder, process.env.AIWRITER_STORAGE_FOLDER);
    if (!fs_1.default.existsSync(storageFolder)) {
        throw new Error(`No '${storageFolder}' folder found, expected folder at '${storageFolder}'`);
    }
    storageFolder = path_1.default.resolve(storageFolder); // nice absolute path
    return storageFolder;
}
exports.getStorageFolder = getStorageFolder;
//# sourceMappingURL=storage.js.map