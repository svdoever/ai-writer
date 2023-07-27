"use strict";

/** @type {import('jest').Config} */
const config = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: ["**/src/__tests__/**/*.ts"],
    testPathIgnorePatterns: ["!*.d.ts"],
};

module.exports = config;
