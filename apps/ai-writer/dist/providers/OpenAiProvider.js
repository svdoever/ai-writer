"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openaiExecuteGeneration = void 0;
const logger = __importStar(require("loglevel"));
function openaiExecuteGeneration(openai, aiConfiguration, prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (aiConfiguration.type) {
            case "completion":
                const completionConfiguration = aiConfiguration.completion;
                return yield openaiCompletionGenerator(openai, aiConfiguration.completion, prompt);
            case "chat.completion":
                return yield openaiChatCompletionGenerator(openai, aiConfiguration.completion, prompt);
            default:
                throw new Error(`Unknown AI type: ${aiConfiguration.type}, please check your 'models.json' file. Currently supported: completion, chat.completion`);
        }
    });
}
exports.openaiExecuteGeneration = openaiExecuteGeneration;
function openaiCompletionGenerator(openai, completionConfiguration, prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug(`Generating text for completion with the following configuration: ${JSON.stringify(completionConfiguration, null, 2)}`);
        const result = yield openai.getCompletions(completionConfiguration.model, [prompt], completionConfiguration);
        try {
            const generatedText = result.choices[0].text;
            return generatedText;
        }
        catch (error) {
            throw new Error(`OpenAI error while generating text for completion: ${completionConfiguration}`);
        }
    });
}
function openaiChatCompletionGenerator(openai, completionConfiguration, prompt) {
    var _a, e_1, _b, _c;
    var _d;
    return __awaiter(this, void 0, void 0, function* () {
        const messages = [
            {
                role: "user",
                content: prompt
            }
        ];
        logger.debug(`Generating text for chat completion with the following configuration: ${JSON.stringify(completionConfiguration, null, 2)}`);
        const events = yield openai.listChatCompletions(completionConfiguration.model, messages, completionConfiguration);
        if (logger.getLevel() <= logger.levels.INFO) {
            process.stdout.write("Completion: ");
        }
        try {
            let generatedText = "";
            try {
                for (var _e = true, events_1 = __asyncValues(events), events_1_1; events_1_1 = yield events_1.next(), _a = events_1_1.done, !_a;) {
                    _c = events_1_1.value;
                    _e = false;
                    try {
                        const event = _c;
                        for (const choice of event.choices) {
                            const delta = (_d = choice.delta) === null || _d === void 0 ? void 0 : _d.content;
                            if (delta !== undefined) {
                                if (logger.getLevel() <= logger.levels.INFO) {
                                    process.stdout.write(delta);
                                }
                                generatedText += delta;
                            }
                        }
                    }
                    finally {
                        _e = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_e && !_a && (_b = events_1.return)) yield _b.call(events_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // the final newline
            logger.info("");
            return generatedText;
        }
        catch (error) {
            throw new Error(`OpenAI error '${error.message}' while generating text for completion: ${JSON.stringify(completionConfiguration, null, 2)}`);
        }
    });
}
//# sourceMappingURL=OpenAiProvider.js.map