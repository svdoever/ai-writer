"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordWrapAndTrim = void 0;
function wordWrapAndTrim(text, maxWidth = 80) {
    // Remove empty lines at the beginning and end of the text
    const trimmedText = text.trim();
    // Split the text into lines
    const lines = trimmedText.split(/\r?\n/);
    // Create a new array to hold the wrapped lines
    const wrappedLines = [];
    // Process each line
    lines.forEach((line) => {
        // Split the line into words
        const words = line.split(/\s+/);
        if (words.length === 1 && words[0] === "") {
            // If the line is empty
            wrappedLines.push(""); // push an empty line
        }
        else {
            let currentLine = "";
            // Loop through the words and create new lines
            words.forEach((word) => {
                const testLine = (currentLine ? currentLine + " " : "") + word;
                if (testLine.length > maxWidth) {
                    wrappedLines.push(currentLine);
                    currentLine = word;
                }
                else {
                    currentLine = testLine;
                }
            });
            // Push the last line if it's not empty
            if (currentLine) {
                wrappedLines.push(currentLine);
            }
        }
    });
    // Join the wrapped lines with newline characters
    return wrappedLines.join("\n");
}
exports.wordWrapAndTrim = wordWrapAndTrim;
//# sourceMappingURL=wordWrapAndTrim.js.map