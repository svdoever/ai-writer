import { renderPrompt } from "../prompt";

test("prompt, no vars", () => {
    const prompt = "my text";
    const result = renderPrompt(prompt, {});
    expect(result).toEqual(prompt);
});


test("prompt, no vars", () => {
    const data = {
        "var1": "test"
    }
    const prompt = "my text <%= var1 %>";
    const result = renderPrompt(prompt, data);
    expect(result).toEqual("my text test");
});