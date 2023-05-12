import { Parameters, ParameterOption } from "./parameters";
import { Command } from "commander";
import { scaffoldAiWriterSolution } from "./scaffoldAiWriterSolution";
import path from "path";
const packageJson = require(path.join(__dirname, "../package.json"));

export function createRecipeProgram(recipe: string, parameters: Parameters, func: (options: any) => void): Command {
    const program = new Command();
    program.version(packageJson.version);
    program.description(packageJson.description);
    parameters.options.forEach((option: ParameterOption) => {
        if (option.required) {
            program.requiredOption(option.option, option.description);
        } else {
            program.option(option.option, option.description, option.default);
        }
    });
    const recipeCommand = program.command(recipe);
    recipeCommand.description(parameters.description);
    recipeCommand.requiredOption("--output <output>", "output file");
    recipeCommand.option("--model-overwrite <model>", "onverwrite the recipe default model settings with settings from a model defined in the 'models.json' file");
    recipeCommand.option("--verbose", "verbose output");
    recipeCommand.option("--dry-run", "dry run");
    recipeCommand.option("--show-output", "show output");
    recipeCommand.action(func);

 

    return program;
}

export function createProgram(): Command {
    const program = new Command();
    program.version(packageJson.version);

    const createCommand = program.command("create");
    createCommand.requiredOption("--folder <folder>", "folder where to create an ai-writer solution");
    createCommand.action((options) => {
        scaffoldAiWriterSolution(options);
    });
    return program;

}