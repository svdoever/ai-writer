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
exports.createProjectBasedOnTemplateInMonoRepo = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const validate_npm_package_name_1 = __importDefault(require("validate-npm-package-name"));
const follow_redirects_1 = __importDefault(require("follow-redirects"));
const unzipper_1 = __importDefault(require("unzipper"));
function downloadFileFromUrl(url, outputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const writeStream = fs_extra_1.default.createWriteStream(outputPath);
            follow_redirects_1.default.https.get(url, (response) => {
                response.pipe(writeStream);
                writeStream.on('finish', () => {
                    writeStream.close();
                    console.log("Downloaded " + outputPath);
                    resolve(true);
                });
            })
                .on('error', (err) => {
                fs_extra_1.default.unlinkSync(outputPath); // Delete the file synchronously
                console.log("Error: " + err.message);
                reject(false);
            });
        });
    });
}
function unzipFiles(zipPath, repo, branch, repoFolder, outputFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs_extra_1.default.createReadStream(zipPath)
                .pipe(unzipper_1.default.Parse())
                .on('entry', function (entry) {
                const fileName = entry.path;
                const type = entry.type; // 'Directory' or 'File'
                const size = entry.vars.uncompressedSize; // There is also compressedSize;
                if (type === "File") {
                    if (fileName.startsWith(`${repo}-${branch}/${repoFolder}/`)) {
                        // Extract only the files within the target directory
                        const outputFile = path_1.default.join(outputFolder, path_1.default.relative(`${repo}-${branch}/${repoFolder}`, fileName));
                        fs_extra_1.default.ensureDirSync(path_1.default.dirname(outputFile));
                        console.log("Extracting " + outputFile);
                        entry.pipe(fs_extra_1.default.createWriteStream(outputFile));
                    }
                    else {
                        // Don't unzip other files or directories within the zip file
                        entry.autodrain();
                    }
                }
                else {
                    entry.autodrain();
                }
            })
                .on('close', resolve) // Resolve when the stream is closed
                .on('error', reject); // Reject on any error
        });
    });
}
function downloadAndUnzip(githubUser, repo, branch, repoFolder, outputFolder) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://github.com/${githubUser}/${repo}/archive/refs/heads/${branch}.zip`;
        const zipPath = path_1.default.join(outputFolder, `${repo}-${branch}.zip`);
        console.log("Downloading from " + url);
        if (!(yield downloadFileFromUrl(url, zipPath))) {
            return false;
        }
        try {
            yield unzipFiles(zipPath, repo, branch, repoFolder, outputFolder);
            fs_extra_1.default.unlinkSync(zipPath);
            return true;
        }
        catch (error) {
            console.error(`Error unzipping ${zipPath}: ${error}`);
            return false;
        }
    });
}
function getParentDirectory(directoryPath) {
    return path_1.default.dirname(directoryPath);
}
function getLastDirectory(directoryPath) {
    return path_1.default.basename(directoryPath);
}
function isValidPackageName(packageName) {
    let validationResult = (0, validate_npm_package_name_1.default)(packageName);
    return validationResult.validForNewPackages;
}
function isDirectoryEmpty(directoryPath) {
    try {
        // Read the contents of the directory
        const files = fs_extra_1.default.readdirSync(directoryPath);
        // If the length of the files array is 0, the directory is empty
        return files.length === 0;
    }
    catch (error) {
        console.error(`Error reading directory: ${error}`);
        return false;
    }
}
function createProjectBasedOnTemplateInMonoRepo(githubUser, repo, branch, repoFolder, projectFolder, packageJsonModifier) {
    return __awaiter(this, void 0, void 0, function* () {
        const parentFolder = getParentDirectory(projectFolder);
        if (!fs_extra_1.default.existsSync(parentFolder)) {
            console.log(`Error: The directory ${parentFolder} does not exist. Please choose an existing folder.`);
            process.exit(1);
        }
        const projectName = getLastDirectory(projectFolder);
        if (!isValidPackageName(projectName)) {
            console.log(`Error: The project name ${projectName} is not a valid npm package name. Use lowercase letters, numbers and dashes only. Start with a letter. E.g. 'ai-writer-blogs'.`);
            process.exit(1);
        }
        const resolvedParentFolder = path_1.default.resolve(parentFolder);
        if (resolvedParentFolder !== parentFolder) {
            console.log(`Creating project '${projectName}' in folder '${parentFolder}' (${resolvedParentFolder})...`);
        }
        else {
            console.log(`Creating project '${projectName}' in folder '${parentFolder}'...`);
        }
        shelljs_1.default.cd(resolvedParentFolder);
        const resolvedProjectFolder = path_1.default.join(resolvedParentFolder, projectName);
        if (fs_extra_1.default.existsSync(projectName)) {
            if (isDirectoryEmpty(projectName)) {
                console.log(`Warning: The folder '${resolvedProjectFolder}' already exists, but is empty. Using this folder.`);
            }
            else {
                console.log(`Error: The folder '${resolvedProjectFolder}' already exists and is not empty. Please choose a different folder.`);
                process.exit(1);
            }
        }
        else {
            fs_extra_1.default.mkdirSync(projectName);
            if (!fs_extra_1.default.existsSync(resolvedProjectFolder)) {
                console.log(`Error: The folder '${resolvedProjectFolder}' could not be created.`);
                process.exit(1);
            }
        }
        yield downloadAndUnzip(githubUser, repo, branch, repoFolder, resolvedProjectFolder);
        const packageJsonPath = path_1.default.join(resolvedProjectFolder, "package.json");
        if (!fs_extra_1.default.existsSync(packageJsonPath)) {
            console.log(`Error: The file '${packageJsonPath}' does not exist.`);
            process.exit(1);
        }
        let packageJson = fs_extra_1.default.readJsonSync(packageJsonPath);
        packageJson.name = projectName;
        if (packageJsonModifier && typeof packageJsonModifier === "function") {
            packageJson = packageJsonModifier(packageJson);
        }
        fs_extra_1.default.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
        console.log(`Project '${projectName}' created in folder '${resolvedProjectFolder}'.`);
        // run npm install
        shelljs_1.default.cd(resolvedProjectFolder);
        console.log(`Running npm install in folder '${resolvedProjectFolder}'...`);
        shelljs_1.default.exec("npm install");
        console.log(`npm install completed in folder '${resolvedProjectFolder}'.`);
    });
}
exports.createProjectBasedOnTemplateInMonoRepo = createProjectBasedOnTemplateInMonoRepo;
//# sourceMappingURL=createProjectBasedOnTemplateInMonoRepo.js.map