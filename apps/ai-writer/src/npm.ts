import * as logger from "loglevel";
import { exec } from 'child_process';

export type Packages= {
    [key: string]: string
}

export async function installPackages(packages: Packages): Promise<void> {
    Object.keys(packages).map(async (packageName) => {
        logger.debug(`Installing npm package '${packageName}'`);
        const version = packages[packageName];
        await installPackage(packageName, version);
    });
}

export async function installPackage(packageName: string, version: string): Promise<void> {
    npmCommand(`npm install ${packageName}@${version}`);
}

// E.g. npmCommand("npm init -y")
export async function npmCommand(command: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        // Install the package
        exec(`${command}`, async (err: Error | null) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
