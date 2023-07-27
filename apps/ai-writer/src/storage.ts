import fs from "fs";
import path from "path";
import { findProjectRoot } from "./packageJson";

export function getStorageFolder(): string {
    if (process.env.AIWRITER_STORAGE_FOLDER === undefined) {
        throw new Error("No 'AIWRITER_STORAGE_FOLDER' environment variable found");
    }

    const projectRootFolder = findProjectRoot(process.cwd());
    if (projectRootFolder === null) {
        throw new Error(`Could not find project root, folder ${process.cwd()} is not part of a project`);
    }

    let storageFolder = path.join(projectRootFolder, process.env.AIWRITER_STORAGE_FOLDER);
    if (!fs.existsSync(storageFolder)) {
        throw new Error(`No '${storageFolder}' folder found, expected folder at '${storageFolder}'`);
    }

    storageFolder = path.resolve(storageFolder); // nice absolute path

    return storageFolder;
}
