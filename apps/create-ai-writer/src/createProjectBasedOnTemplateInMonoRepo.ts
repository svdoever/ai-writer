import shell from 'shelljs';
import path from 'path';
import fs from 'fs-extra';
import validatePackageName from 'validate-npm-package-name';
import followRedirects from 'follow-redirects';
import unzipper from 'unzipper';
import http from 'http';

async function downloadFileFromUrl(url: string, outputPath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(outputPath);
        followRedirects.https.get(url, (response: http.IncomingMessage) => {
            response.pipe(writeStream);
            writeStream.on('finish', () => {
                writeStream.close();
                console.log("Downloaded " + outputPath);
                resolve(true);
            });
        })
        .on('error', (err: Error) => {
            fs.unlinkSync(outputPath); // Delete the file synchronously
            console.log("Error: " + err.message);
            reject(false);
        });
    });
}

async function unzipFiles(zipPath: string, repo: string, branch: string, repoFolder: string, outputFolder: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.createReadStream(zipPath)
            .pipe(unzipper.Parse())
            .on('entry', function (entry) {
                const fileName = entry.path;
                const type = entry.type; // 'Directory' or 'File'
                const size = entry.vars.uncompressedSize; // There is also compressedSize;

                if (type === "File") {
                    if (fileName.startsWith(`${repo}-${branch}/${repoFolder}/`)) {
                        // Extract only the files within the target directory
                        const outputFile = path.join(outputFolder, path.relative(`${repo}-${branch}/${repoFolder}`, fileName));
                        fs.ensureDirSync(path.dirname(outputFile));
                        console.log("Extracting " + outputFile);
                        entry.pipe(fs.createWriteStream(outputFile));
                    } else {
                        // Don't unzip other files or directories within the zip file
                        entry.autodrain();
                    }
                } else {
                    entry.autodrain();
                }
            })
            .on('close', resolve) // Resolve when the stream is closed
            .on('error', reject); // Reject on any error
    });
}

async function downloadAndUnzip(githubUser: string, repo: string, branch: string, repoFolder: string, outputFolder: string): Promise<boolean> {
    const url = `https://github.com/${githubUser}/${repo}/archive/refs/heads/${branch}.zip`;
    const zipPath = path.join(outputFolder, `${repo}-${branch}.zip`);
    console.log("Downloading from " + url);
    if (!(await downloadFileFromUrl(url, zipPath))) {
        return false;
    }

    try {
        await unzipFiles(zipPath, repo, branch, repoFolder, outputFolder);
        fs.unlinkSync(zipPath);
        return true;
    } catch (error) {
        console.error(`Error unzipping ${zipPath}: ${error}`);
        return false;
    }
}

function getParentDirectory(directoryPath: string): string {
    return path.dirname(directoryPath);
}

function getLastDirectory(directoryPath: string): string {
    return path.basename(directoryPath);
}

function isValidPackageName(packageName: string): boolean {
    let validationResult = validatePackageName(packageName);
    return validationResult.validForNewPackages;
}

function isDirectoryEmpty(directoryPath: string): boolean {
    try {
        // Read the contents of the directory
        const files = fs.readdirSync(directoryPath);

        // If the length of the files array is 0, the directory is empty
        return files.length === 0;
    } catch (error) {
        console.error(`Error reading directory: ${error}`);
        return false;
    }
}

export async function createProjectBasedOnTemplateInMonoRepo(
    githubUser: string,
    repo: string,
    branch: string,
    repoFolder: string,
    projectFolder: string,
    packageJsonModifier?: (packageJson: any) => any
): Promise<void> {
    const parentFolder = getParentDirectory(projectFolder);
    if (!fs.existsSync(parentFolder)) {
        console.log(`Error: The directory ${parentFolder} does not exist. Please choose an existing folder.`);
        process.exit(1);
    }

    const projectName = getLastDirectory(projectFolder);
    if (!isValidPackageName(projectName)) {
        console.log(`Error: The project name ${projectName} is not a valid npm package name. Use lowercase letters, numbers and dashes only. Start with a letter. E.g. 'ai-writer-blogs'.`);
        process.exit(1);
    }

    const resolvedParentFolder = path.resolve(parentFolder);
    if (resolvedParentFolder !== parentFolder) {
        console.log(`Creating project '${projectName}' in folder '${parentFolder}' (${resolvedParentFolder})...`)
    } else {
        console.log(`Creating project '${projectName}' in folder '${parentFolder}'...`)
    }

    shell.cd(resolvedParentFolder);

    const resolvedProjectFolder = path.join(resolvedParentFolder, projectName);
    
    if (fs.existsSync(projectName)) {
        if (isDirectoryEmpty(projectName)) {
            console.log(`Warning: The folder '${resolvedProjectFolder}' already exists, but is empty. Using this folder.`);
        } else {
            console.log(`Error: The folder '${resolvedProjectFolder}' already exists and is not empty. Please choose a different folder.`);
            process.exit(1);
        }
    } else {
        fs.mkdirSync(projectName);
        if (!fs.existsSync(resolvedProjectFolder)) {
            console.log(`Error: The folder '${resolvedProjectFolder}' could not be created.`);
            process.exit(1);
        }
    }

    await downloadAndUnzip(githubUser, repo, branch, repoFolder, resolvedProjectFolder);
    const packageJsonPath = path.join(resolvedProjectFolder, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
        console.log(`Error: The file '${packageJsonPath}' does not exist.`);
        process.exit(1);
    }

    let packageJson = fs.readJsonSync(packageJsonPath);
    packageJson.name = projectName;

    if (packageJsonModifier && typeof packageJsonModifier === "function") {
        packageJson = packageJsonModifier(packageJson);
    }

    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });

    console.log(`Project '${projectName}' created in folder '${resolvedProjectFolder}'.`);
    
    // run npm install
    shell.cd(resolvedProjectFolder);
    console.log(`Running npm install in folder '${resolvedProjectFolder}'...`);
    shell.exec("npm install");
    console.log(`npm install completed in folder '${resolvedProjectFolder}'.`);
}