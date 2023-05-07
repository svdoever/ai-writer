import * as fs from 'fs-extra';
import * as path from 'path';
import * as logger from "loglevel";

export function ensureFolder(folderPath: string): void {
    try {
        fs.ensureDirSync(folderPath);
        logger.info(`Folder '${folderPath}' ensured.`);
    } catch (error) {
        logger.error(`Error ensuring folder '${folderPath}':`, error);
        throw error;
    }
}

export function ensureFolderForFile(filepath: string): void {
    try {
        const folderPath = path.dirname(filepath);
        fs.ensureDirSync(folderPath);
        logger.info(`Folder '${folderPath}' ensured for file '${filepath}'.`);
    } catch (error) {
        logger.error(`Error ensuring folder for file '${filepath}':`, error);
        throw error;
    }
}