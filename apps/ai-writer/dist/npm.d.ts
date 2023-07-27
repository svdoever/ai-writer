export type Packages = {
    [key: string]: string;
};
export declare function installPackages(packages: Packages): Promise<void>;
export declare function installPackage(packageName: string, version: string): Promise<void>;
export declare function npmCommand(command: string): Promise<void>;
