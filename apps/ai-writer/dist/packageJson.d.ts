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
}
export declare function loadPackageJson(rootFolder?: string): PackageJson;
export declare function savePackageJson(packageJson: PackageJson, rootFolder?: string): void;
export declare function fixPackageJson(fixer: (packageJson: PackageJson) => void, rootFolder?: string): void;
export declare function isValidNpmFolderName(str: string): boolean;
export declare function findEnvFile(startPath: string): string | null;
export declare function findProjectRoot(startPath: string): string | null;
export declare function validateNodeVersion(rootFolder?: string): void;
