"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lint = void 0;
const ejs_1 = __importDefault(require("ejs"));
const ejs_include_regex_1 = __importDefault(require("ejs-include-regex"));
const syntax_error_1 = __importDefault(require("syntax-error"));
function lint(text, opts = {}) {
    const arr = new ejs_1.default.Template(text, opts).templateText.split("\n");
    console.log(arr);
    // Initialize mode var
    // This is used to indicate the status:
    // Inside Scriptlet, mode=1 (scriptlet) or mode=2 (expression)
    // Outside Scriptlet, mode=0
    let mode = 0;
    // Initialize delimiter variable
    const d = opts.delimiter !== undefined && opts.delimiter !== "" ? opts.delimiter : "%";
    const js = arr
        .map((str) => {
        var _a, _b;
        switch (str) {
            case `<${d}`:
            case `<${d}_`:
                mode = 1;
                return padWhitespace(str);
            case `<${d}=`:
            case `<${d}-`:
                mode = 2;
                return `;${padWhitespace(str)}`;
            case `${d}>`:
            case `-${d}>`:
            case `_${d}>`:
                str = padWhitespace(str) + (mode === 2 ? ";" : "");
                mode = 0;
                return str;
            case (_a = str.match(ejs_include_regex_1.default)) === null || _a === void 0 ? void 0 : _a.input:
                // if old-style include
                // - replace with whitespace if preprocessorInclude is set
                // - otherwise, leave it intact so it errors out correctly
                return ((_b = opts.preprocessorInclude) !== null && _b !== void 0 ? _b : false) ? padWhitespace(str) : str;
            default:
                // If inside Scriptlet, pass through
                if (mode !== 0)
                    return str;
                // else, pad with whitespace
                return padWhitespace(str);
        }
    })
        .join("");
    const checkOptions = {
        allowAwaitOutsideFunction: opts.await === true,
    };
    return (0, syntax_error_1.default)(js, undefined, checkOptions);
}
exports.lint = lint;
function padWhitespace(text) {
    let res = "";
    text.split("\n").forEach((line, i) => {
        // Add newline
        if (i !== 0)
            res += "\n";
        // Pad with whitespace between each newline
        for (let x = 0; x < line.length; x++)
            res += " ";
    });
    return res;
}
//# sourceMappingURL=ejsLint.js.map