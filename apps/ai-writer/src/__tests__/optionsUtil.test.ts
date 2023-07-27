import { enhanceOptions, nameWithDashesToCamelCase, optionToObjectFieldName } from "../optionsUtil";

describe("nameWithDashesToCamelCase", () => {
    it("should convert name with dashes to camel case", () => {
        expect(nameWithDashesToCamelCase("option")).toEqual("option");
        expect(nameWithDashesToCamelCase("option-name")).toEqual("optionName");
        expect(nameWithDashesToCamelCase("option-name-value")).toEqual("optionNameValue");
        expect(nameWithDashesToCamelCase("option-name-value-1")).toEqual("optionNameValue1");
        expect(nameWithDashesToCamelCase("option-Name-Value-1")).toEqual("optionNameValue1");
    });

    it("should not convert name without dashes", () => {
        expect(nameWithDashesToCamelCase("optionName")).toEqual("optionName");
        expect(nameWithDashesToCamelCase("optionname")).toEqual("optionname");
    });

    it("should handle empty string input", () => {
        expect(nameWithDashesToCamelCase("")).toEqual("");
    });

    it("should throw an error for invalid options", () => {
        expect(() => nameWithDashesToCamelCase("my--option")).toThrowError("Invalid name 'my--option'. Name must not contain '--'");
    });
});

describe("optionToObjectFieldName", () => {
    it("should convert option name to object field name", () => {
        expect(optionToObjectFieldName("--option")).toEqual("option");
        expect(optionToObjectFieldName("--option-name")).toEqual("optionName");
        expect(optionToObjectFieldName("--option-name <value>")).toEqual("optionName");
    });

    it("should throw an error for invalid options", () => {
        expect(() => optionToObjectFieldName("option")).toThrowError("Invalid option 'option'. Option must start with '--'");
        expect(() => optionToObjectFieldName("--")).toThrowError("Invalid option '--'. Option must have a name after '--'");
        expect(() => optionToObjectFieldName("---option")).toThrowError(
            "Invalid option '---option'. Option name must start with a letter and may only contain letters, numbers and dashes"
        );
        expect(() => optionToObjectFieldName("--0option")).toThrowError(
            "Invalid option '--0option'. Option name must start with a letter and may only contain letters, numbers and dashes"
        );
    });
});

describe("enhanceOptions", () => {
    it("should add missing options and set default values", () => {
        const options = { option1: "value1" };
        const parameters = {
            options: [
                { option: "--option1", required: false, default: "default1" },
                { option: "--option2", required: false, default: "default2" },
            ],
        };
        const enhancedOptions = enhanceOptions(options, parameters);
        expect(enhancedOptions).toEqual({ option1: "value1", option2: "default2" });
    });

    it("should throw an error for missing required options", () => {
        const options = { option1: "value1" };
        const parameters = {
            options: [
                { option: "--option1", required: true },
                { option: "--option2", required: true },
            ],
        };
        expect(() => enhanceOptions(options, parameters)).toThrowError("Missing required option 'option2'");
    });

    it("should not modify options if all required options are present", () => {
        const options = { option1: "value1", option2: "value2" };
        const parameters = {
            options: [
                { option: "--option1", required: true },
                { option: "--option2", required: true },
            ],
        };
        const enhancedOptions = enhanceOptions(options, parameters);
        expect(enhancedOptions).toEqual(options);
    });

    it("should not modify options if all options are present", () => {
        const options = { option1: "value1", option2: "value2" };
        const parameters = {
            options: [
                { option: "--option1", required: false, default: "default1" },
                { option: "--option2", required: false, default: "default2" },
            ],
        };
        const enhancedOptions = enhanceOptions(options, parameters);
        expect(enhancedOptions).toEqual(options);
    });
});
