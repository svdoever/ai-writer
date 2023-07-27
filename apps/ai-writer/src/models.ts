import fs from "fs";
import path from "path";
import logger from 'loglevel';
import { findProjectRoot } from "./packageJson";

export type Models = { [key: string]: unknown };

export function getModels(): Models {
    const projectRootFolder = findProjectRoot(process.cwd());
    if (!projectRootFolder) {
        throw new Error(`Could not find project root, folder ${process.cwd()} is not part of a project`);
    }

    let models: { [key: string]: unknown } = {};
    const modelsFile = path.join(projectRootFolder, "models.json");
    logger.debug(`models file: ${modelsFile}`);
    if (fs.existsSync(modelsFile)) {
        const modelsJSON = fs.readFileSync(modelsFile, "utf8");
        models = JSON.parse(modelsJSON);
    } else {
        throw new Error(`Models file expected at '${modelsFile}'`);
    }

    return models;
}