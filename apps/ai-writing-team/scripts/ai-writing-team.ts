#!/usr/bin/env -S npx tsx

import fs from "fs-extra";
import path from "path";
import logger from "loglevel";
import { Command, Option } from "commander";
import { type RecipeOptionsBase, executeRecipe } from "ai-writer";

interface WriteOptions {
    verbose: boolean;
    debug: boolean;
    dryRun: boolean;
    title: string;
    keywords: string;
    language: string;
    output: string;
}

async function writeArticle(options: WriteOptions): Promise<void> {
    logger.info("Writing article");
    logger.info(`Raw title: ${options.title}`);

    const baseOptions: RecipeOptionsBase = {
        verbose: options.verbose,
        debug: options.debug,
        dryRun: options.dryRun,
        output: options.output,
    };

    const title = await executeRecipe("10-ultimate-title", { 
        ...baseOptions, 
        title: options.title,
        keywords: options.keywords,
        language: options.language,
        output: path.join(options.output, "title")
     });
     const draft = await executeRecipe("20-freelancer-draft", {
        ...baseOptions, 
        title: title,
        keywords: options.keywords,
        language: options.language,
        output: path.join(options.output, "draft")
     });
     const comments = await executeRecipe("30-editor-review", {
        ...baseOptions, 
        title: title,
        text: draft,
        language: options.language,
        output: path.join(options.output, "review")
     });
}

function createProgram(): Command {
    const program = new Command();
    program.version("1.0.0");
    program.description("The AI Writing team CLI");

    const writeCommand = program.command("write");
    writeCommand.description("Write an article");

    writeCommand.option("--verbose", "show verbose output");
    writeCommand.option("--debug", "show debug output");
    writeCommand.option("--dry-run", "do not call the LLM APIs");
    writeCommand.requiredOption("--title <title>", "a rough title for the article");
    writeCommand.option("--keywords <keywords>", "relevant keywords or phrases, comma seperated");
    writeCommand.option("--language <language>", "language of the article", "English");
    writeCommand.option("--output <output>", "output file");

    writeCommand.action(async (options: WriteOptions) => {
        if (options.verbose) {
            logger.setLevel("info");
        }
        if (options.debug) {
            logger.setLevel("debug");
        }

        await writeArticle(options);
    });
    return program;
}

void (async () => {
    try {
        const program = createProgram();
        program.parse(process.argv);
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();
