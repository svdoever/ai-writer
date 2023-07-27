"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecipeProgram = void 0;
const commander_1 = require("commander");
const packageJson_1 = require("./packageJson");
function createRecipeProgram(recipe, parameters, func) {
    const packageJson = (0, packageJson_1.loadPackageJson)();
    const program = new commander_1.Command();
    program.version(packageJson.version);
    program.description(packageJson.description);
    const recipeCommand = program.command(recipe);
    parameters.options.forEach((option) => {
        var _a;
        if ((_a = option.required) !== null && _a !== void 0 ? _a : false) {
            recipeCommand.requiredOption(option.option, option.description);
        }
        else {
            recipeCommand.option(option.option, option.description, option.default);
        }
    });
    if (parameters.description != null) {
        recipeCommand.description(parameters.description);
    }
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
exports.createRecipeProgram = createRecipeProgram;
//# sourceMappingURL=commanderUtils.js.map