"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_1 = require("../prompt");
test("prompt, no vars", () => {
    const prompt = "my text";
    const result = (0, prompt_1.renderPrompt)(prompt, {});
    expect(result).toEqual(prompt);
});
test("prompt, no vars", () => {
    const data = {
        "var1": "test"
    };
    const prompt = "my text <%= var1 %>";
    const result = (0, prompt_1.renderPrompt)(prompt, data);
    expect(result).toEqual("my text test");
});
//# sourceMappingURL=prompt.test.js.map