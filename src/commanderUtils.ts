import { Parameters, ParameterOption } from "./parameters";
import { Command } from "commander";

export function createProgram(parameters: Parameters, func: (options: any) => void) {
    const program = new Command();
    program.version("0.0.1");
    program.description(parameters.description);
    parameters.options.forEach((option: ParameterOption) => {
        if (option.required) {
            program.requiredOption(option.option, option.description);
        } else {
            program.option(option.option, option.description, option.default);
        }
    });
    program.requiredOption("--output <output>", "output file");
    program.option("--model-overwrite <model>", "onverwrite the recipe default model settings with settings from a model defined in the 'models.json' file");
    program.option("--verbose", "verbose output");
    program.option("--dry-run", "dry run");
    program.option("--show-output", "show output");
    program.action(func);
    return program;
}