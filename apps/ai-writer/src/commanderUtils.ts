import { Parameters, ParameterOption } from "./parameters";
import { Command } from "commander";
import { scaffoldAiWriterSolution } from "./scaffoldAiWriterSolution";
import path from "path";
import { isValidNpmFolderName, loadPackageJson } from "./packageJson";

export function createRecipeProgram(recipe: string, parameters: Parameters, func: (options: any) => void): Command {
    const packageJson = loadPackageJson();

    const program = new Command();
    program.version(packageJson.version);
    program.description(packageJson.description);
    
    const recipeCommand = program.command(recipe);
    parameters.options.forEach((option: ParameterOption) => {
        if (option.required) {
            recipeCommand.requiredOption(option.option, option.description);
        } else {
            recipeCommand.option(option.option, option.description, option.default);
        }
    });
    recipeCommand.description(parameters.description);
    recipeCommand.requiredOption("--output <output>", "output file");
    recipeCommand.option("--output-format <output-format>", "overwrite the default output format 'txt', use an output format as defined in the 'output-formats.json' file");
    recipeCommand.option("--model-override <model>", "override the recipe default model settings with settings from a model defined in the 'models.json' file");
    recipeCommand.option("--verbose", "verbose output");
    recipeCommand.option("--debug", "debug output");
    recipeCommand.option("--dry-run", "dry run");
    recipeCommand.option("--show-output", "show output");
    recipeCommand.action(func);

    return program;
}

export function createProgram(): Command {
    const packageJson = loadPackageJson();

    const program = new Command();
    program.version(packageJson.version);

    const createCommand = program.command("create");
    createCommand.requiredOption("--folder <lowercase-folder-name>", "folder where to create an ai-writer solution");
    createCommand.action((options) => {
        if (!isValidNpmFolderName(options.folder)) {
            throw new Error(`Invalid folder name '${options.folder}', use only lowercase letters, numbers, underscores and hyphens, and start with a letter`);
        }
        scaffoldAiWriterSolution(options);
    });
    return program;

}