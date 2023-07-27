// Examples:
// "option" -> "option"

import { type Parameters, type ParameterOption } from "./parameters";

// "option-name" -> "optionName"
export function nameWithDashesToCamelCase(name: string): string {
    if (name.includes("--")) {
        throw new Error(`Invalid name '${name}'. Name must not contain '--'`);
    }
    return name.replace(/-([a-zA-Z0-9])/g, function (g) {
        return g[1].toUpperCase();
    });
}

// Option is specified in one of the following formats:
// "--option": this is a boolean option
// "--option <value>": this is a string option
// Convert option name to object field name by removing "--" and converting the first letter after "-" to uppercase next letter
// Examples:
// "--option" -> "option"
// "--option-name" -> "optionName"
// "--option-name <value>" -> "optionName"
export function optionToObjectFieldName(option: string): string {
    if (!option.startsWith("--")) {
        throw new Error(`Invalid option '${option}'. Option must start with '--'`);
    }
    if (option.substring(2).length === 0) {
        throw new Error(`Invalid option '${option}'. Option must have a name after '--'`);
    }

    let optionName = option.substring(2).split(" ")[0];
    // optionName should start with a letter, may only contain letters, numbers and dashes
    if (optionName.match(/^[a-zA-Z][a-zA-Z0-9-]*$/) === null) {
        throw new Error(`Invalid option '${option}'. Option name must start with a letter and may only contain letters, numbers and dashes`);
    }

    // convert letter after "-" to uppercase next letter
    if (optionName.includes("-")) {
        optionName = nameWithDashesToCamelCase(optionName);
    }
    return optionName;
}

// Given the options, add missing optional options with default values if defined in parameters
export function enhanceOptions(options: Record<string, string | boolean>, parameters: Parameters): Record<string, string | boolean> {
    const enhancedOptions = options;
    parameters.options.forEach((parameter: ParameterOption) => {
        const optionName = optionToObjectFieldName(parameter.option);

        if (parameter.required === undefined || parameter.required) {
            if (enhancedOptions[optionName] === undefined) {
                throw new Error(`Missing required option '${optionName}'`);
            }
        } else if (enhancedOptions[optionName] === undefined && parameter.default !== undefined) {
            enhancedOptions[optionName] = parameter.default;
        }
    });

    return enhancedOptions;
}
