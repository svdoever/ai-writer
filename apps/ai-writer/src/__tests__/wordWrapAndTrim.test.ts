import { wordWrapAndTrim } from "../wordWrapAndTrim";

test("trim word wrap, no newlines", () => {
  const text = "\n\n\naa bb ccc ddd eeee eeee fff fff gg gg\n\n\n";
  const result = wordWrapAndTrim(text, 8);
  expect(result).toEqual("aa bb\nccc ddd\neeee\neeee fff\nfff gg\ngg");
});


test("trim word wrap, with a newline", () => {
  const text = "\n\n\naa bb ccc\nddd eeee eeee fff fff gg gg\n\n\n";
  const result = wordWrapAndTrim(text, 8);
  expect(result).toEqual("aa bb\nccc\nddd eeee\neeee fff\nfff gg\ngg");
});

test("trim word wrap, with double newlines", () => {
  const text = "\n\n\naa bb ccc\n\nddd eeee eeee fff fff gg gg\n\n\n";
  const result = wordWrapAndTrim(text, 8);
  expect(result).toEqual("aa bb\nccc\n\nddd eeee\neeee fff\nfff gg\ngg");
});

