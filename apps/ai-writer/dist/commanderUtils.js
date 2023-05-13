"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgram = exports.createRecipeProgram = void 0;
const commander_1 = require("commander");
const scaffoldAiWriterSolution_1 = require("./scaffoldAiWriterSolution");
const packageJson_1 = require("./packageJson");
function createRecipeProgram(recipe, parameters, func) {
    const packageJson = (0, packageJson_1.loadPackageJson)();
    const program = new commander_1.Command();
    program.version(packageJson.version);
    program.description(packageJson.description);
    const recipeCommand = program.command(recipe);
    parameters.options.forEach((option) => {
        if (option.required) {
            recipeCommand.requiredOption(option.option, option.description);
        }
        else {
            recipeCommand.option(option.option, option.description, option.default);
        }
    });
    recipeCommand.description(parameters.description);
    recipeCommand.requiredOption("--output <output>", "output file");
    recipeCommand.option("--output-format <output-format>", "overwrite the default output format 'txt', use an output format as defined in the 'output-formats.json' file");
    recipeCommand.option("--model-overwrite <model>", "onverwrite the recipe default model settings with settings from a model defined in the 'models.json' file");
    recipeCommand.option("--verbose", "verbose output");
    recipeCommand.option("--debug", "debug output");
    recipeCommand.option("--dry-run", "dry run");
    recipeCommand.option("--show-output", "show output");
    recipeCommand.action(func);
    return program;
}
exports.createRecipeProgram = createRecipeProgram;
function createProgram() {
    const packageJson = (0, packageJson_1.loadPackageJson)();
    const program = new commander_1.Command();
    program.version(packageJson.version);
    const createCommand = program.command("create");
    createCommand.requiredOption("--folder <lowercase-folder-name>", "folder where to create an ai-writer solution");
    createCommand.action((options) => {
        if (!(0, packageJson_1.isValidNpmFolderName)(options.folder)) {
            throw new Error(`Invalid folder name '${options.folder}', use only lowercase letters, numbers, underscores and hyphens, and start with a letter`);
        }
        (0, scaffoldAiWriterSolution_1.scaffoldAiWriterSolution)(options);
    });
    return program;
}
exports.createProgram = createProgram;
//# sourceMappingURL=commanderUtils.js.map