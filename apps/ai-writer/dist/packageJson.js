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
exports.validateNodeVersion = exports.findProjectRoot = exports.findEnvFile = exports.isValidNpmFolderName = exports.fixPackageJson = exports.savePackageJson = exports.loadPackageJson = void 0;
const fs = __importStar(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const semver = __importStar(require("semver"));
const logger = __importStar(require("loglevel"));
;
function getPackageJsonFilePath(rootFolder) {
    let packageJsonPath;
    if (rootFolder == null) {
        packageJsonPath = path_1.default.resolve(path_1.default.join(__dirname, "../package.json"));
    }
    else {
        packageJsonPath = path_1.default.resolve(path_1.default.join(rootFolder, "package.json"));
    }
    return packageJsonPath;
}
function loadPackageJson(rootFolder) {
    const packageJsonPath = getPackageJsonFilePath(rootFolder);
    const packageJson = fs.readJsonSync(packageJsonPath);
    return packageJson;
}
exports.loadPackageJson = loadPackageJson;
function savePackageJson(packageJson, rootFolder) {
    const packageJsonPath = getPackageJsonFilePath(rootFolder);
    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
}
exports.savePackageJson = savePackageJson;
function fixPackageJson(fixer, rootFolder) {
    const packageJson = loadPackageJson(rootFolder);
    fixer(packageJson);
    savePackageJson(packageJson, rootFolder);
}
exports.fixPackageJson = fixPackageJson;
function isValidNpmFolderName(str) {
    // The regular expression tests for strings that start with a lowercase letter
    // and contain only lowercase letters, underscores, and hyphens.
    const regex = /^[a-z][a-z0-9_-]*$/;
    return regex.test(str);
}
exports.isValidNpmFolderName = isValidNpmFolderName;
function findEnvFile(startPath) {
    let currentPath = startPath;
    while (true) {
        // Check if .env exists in the current directory
        if (fs.existsSync(path_1.default.join(currentPath, ".env"))) {
            return path_1.default.join(currentPath, ".env");
        }
        // Check if package.json exists in the current directory
        if (fs.existsSync(path_1.default.join(currentPath, "package.json"))) {
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
function findProjectRoot(startPath) {
    let currentPath = startPath;
    while (true) {
        // Check if package.json exists in the current directory
        if (fs.existsSync(path_1.default.join(currentPath, "package.json"))) {
            return currentPath;
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
exports.findProjectRoot = findProjectRoot;
function validateNodeVersion(rootFolder) {
    var _a;
    const packageJson = loadPackageJson(rootFolder);
    // Check if engines field exists and if node is defined
    if (((_a = packageJson.engines) === null || _a === void 0 ? void 0 : _a.node).length > 0) {
        const requiredVersion = packageJson.engines.node;
        const currentVersion = process.version;
        // Use semver to check version
        if (!semver.satisfies(currentVersion, requiredVersion)) {
            logger.error(`Current node version ${currentVersion} does not satisfy the required version ${requiredVersion}`);
            process.exit(1);
        }
        else {
            logger.debug(`Current node version ${currentVersion} satisfies the required version ${requiredVersion}`);
        }
    }
    else {
        logger.error("No node version specified in package.json");
    }
}
exports.validateNodeVersion = validateNodeVersion;
//# sourceMappingURL=packageJson.js.map