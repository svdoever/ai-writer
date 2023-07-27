import dotenv from "dotenv";
import logger from "loglevel";
import fs from "fs";
import path from "path";


export function findEnvFile(startPath: string): string | null {
    let currentPath = startPath;

    while (true) {
        // Check if .env exists in the current directory
        if (fs.existsSync(path.join(currentPath, ".env"))) {
            return path.join(currentPath, ".env");
        }

        // Check if package.json exists in the current directory
        if (fs.existsSync(path.join(currentPath, "package.json"))) {
            return null;
        }

        // Go up to the parent directory
        const parentPath = path.dirname(currentPath);

        // If we've reached the root directory, stop
        if (parentPath === currentPath) {
            return null;
        }

        currentPath = parentPath;
    }
}

export function loadEnv() {
    // read .env file
    const envPath = findEnvFile(process.cwd());
    if (envPath) {
        logger.debug('Found .env file at', envPath);
        dotenv.config({ path: envPath! });
    } else {
        logger.debug('Did not find a .env file - depending on already configured environment variables');
    }
}