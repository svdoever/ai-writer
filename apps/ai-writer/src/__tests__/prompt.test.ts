import { renderPrompt } from "../prompt";

test("prompt, empty data", () => {
    const prompt = "my text";
    const result = renderPrompt(prompt, {});
    expect(result).toEqual(prompt);
});

test("prompt, simple data with single var", () => {
    const data = {
        var1: "test",
    };
    const prompt = "my text <%= var1 %>";
    const result = renderPrompt(prompt, data);
    expect(result).toEqual("my text test");
});
