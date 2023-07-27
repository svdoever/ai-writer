import * as fs from "fs-extra";
import path from "path";
import * as semver from "semver";
import * as logger from "loglevel";

export interface PackageJson {
    name: string;
    version: string;
    description: string;
    main: string;
    scripts: Record<string, string>;
    keywords: string[];
    author: {
        name: string;
        email: string;
        url: string;
    };
    license: string;
    engines: {
        node: string;
    };
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    // You can add other properties as needed...
};

function getPackageJsonFilePath(rootFolder?: string): string {
    let packageJsonPath: string;
    if (rootFolder == null) {
        packageJsonPath = path.resolve(path.join(__dirname, "../package.json"));
    } else {
        packageJsonPath = path.resolve(path.join(rootFolder, "package.json"));
    }
    return packageJsonPath;
}

export function loadPackageJson(rootFolder?: string): PackageJson {
    const packageJsonPath = getPackageJsonFilePath(rootFolder);
    const packageJson = fs.readJsonSync(packageJsonPath);
    return packageJson;
}

export function savePackageJson(packageJson: PackageJson, rootFolder?: string): void {
    const packageJsonPath = getPackageJsonFilePath(rootFolder);
    fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
}

export function fixPackageJson(fixer: (packageJson: PackageJson) => void, rootFolder?: string): void {
    const packageJson = loadPackageJson(rootFolder);
    fixer(packageJson);
    savePackageJson(packageJson, rootFolder);
}

export function isValidNpmFolderName(str: string): boolean {
    // The regular expression tests for strings that start with a lowercase letter
    // and contain only lowercase letters, underscores, and hyphens.
    const regex = /^[a-z][a-z0-9_-]*$/;
    return regex.test(str);
}

export function findProjectRoot(startPath: string): string | null {
    let currentPath = startPath;

    while (true) {
        // Check if package.json exists in the current directory
        if (fs.existsSync(path.join(currentPath, "package.json"))) {
            return currentPath;
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

export function validateNodeVersion(rootFolder?: string): void {
    const packageJson = loadPackageJson(rootFolder);

    // Check if engines field exists and if node is defined
    if ((packageJson.engines?.node).length > 0) {
        const requiredVersion = packageJson.engines.node;
        const currentVersion = process.version;

        // Use semver to check version
        if (!semver.satisfies(currentVersion, requiredVersion)) {
            logger.error(
                `Current node version ${currentVersion} does not satisfy the required version ${requiredVersion}`
            );
            process.exit(1);
        } else {
            logger.debug(`Current node version ${currentVersion} satisfies the required version ${requiredVersion}`);
        }
    } else {
        logger.error("No node version specified in package.json");
    }
}
