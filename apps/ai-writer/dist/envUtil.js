"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = exports.findEnvFile = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const loglevel_1 = __importDefault(require("loglevel"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function findEnvFile(startPath) {
    let currentPath = startPath;
    while (true) {
        // Check if .env exists in the current directory
        if (fs_1.default.existsSync(path_1.default.join(currentPath, ".env"))) {
            return path_1.default.join(currentPath, ".env");
        }
        // Check if package.json exists in the current directory
        if (fs_1.default.existsSync(path_1.default.join(currentPath, "package.json"))) {
            return null;
        }
        // Go up to the parent directory
        const parentPath = path_1.default.dirname(currentPath);
        // If we've reached the root directory, stop
        if (parentPath === currentPath) {
            return null;
        }
        currentPath = parentPath;
    }
}
exports.findEnvFile = findEnvFile;
function loadEnv() {
    // read .env file
    const envPath = findEnvFile(process.cwd());
    if (envPath != null) {
        loglevel_1.default.debug("Found .env file at", envPath);
        dotenv_1.default.config({ path: envPath });
    }
    else {
        loglevel_1.default.debug("Did not find a .env file - depending on already configured environment variables");
    }
}
exports.loadEnv = loadEnv;
//# sourceMappingURL=envUtil.js.map