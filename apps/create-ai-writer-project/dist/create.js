#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const createProjectBasedOnTemplateInMonoRepo_1 = require("./createProjectBasedOnTemplateInMonoRepo");
function createProject() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the project folder from the command line argument
        const projectFolder = process.argv[2];
        if (!projectFolder) {
            console.log('Missing required argument project-folder.');
            process.exit(1);
        }
        yield (0, createProjectBasedOnTemplateInMonoRepo_1.createProjectBasedOnTemplateInMonoRepo)("svdoever", "ai-writer", "main", "apps/ai-writer-examples", projectFolder, (packageJson) => {
            return packageJson;
        });
        console.log("Done.");
    });
}
void (() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        createProject();
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}))();
//# sourceMappingURL=create.js.map