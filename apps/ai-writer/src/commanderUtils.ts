import { type Parameters, type ParameterOption } from "./parameters";
import { Command } from "commander";
import { loadPackageJson } from "./packageJson";

export function createRecipeProgram(recipe: string, parameters: Parameters, func: (options: any) => Promise<void>): Command {
    const packageJson = loadPackageJson();

    const program = new Command();
    program.version(packageJson.version);
    program.description(packageJson.description);

    const recipeCommand = program.command(recipe);
    parameters.options.forEach((option: ParameterOption) => {
        if (option.required ?? false) {
            recipeCommand.requiredOption(option.option, option.description);
        } else {
            recipeCommand.option(option.option, option.description, option.default);
        }
    });
    if (parameters.description != null) {
        recipeCommand.description(parameters.description);
    }
    recipeCommand.requiredOption("--output <output>", "output file");
    recipeCommand.option(
        "--output-format <output-format>",
        "overwrite the default output format 'txt', use an output format as defined in the 'output-formats.json' file"
    );
    recipeCommand.option("--model-override <model>", "override the recipe default model settings with settings from a model defined in the 'models.json' file");
    recipeCommand.option("--verbose", "verbose output");
    recipeCommand.option("--debug", "debug output");
    recipeCommand.option("--dry-run", "dry run");
    recipeCommand.option("--show-output", "show output");
    recipeCommand.action(func);

    return program;
}
