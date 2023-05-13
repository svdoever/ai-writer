import * as logger from "loglevel";
import chalk from "chalk";

export function logRecipe(recipe: string): void {
    logger.info(`${chalk.bold.blue('Recipe:')} ${chalk.blue(recipe)}`);
}

export function logOptions(options: unknown): void {
    const optionsString = JSON.stringify(options, null, 2);
    console.info(`\n${chalk.bold.blue('Options:')}\n${chalk.blue(optionsString)}\n`);
}

export function logPromptData(promptData: unknown): void {
    const promptDataString = JSON.stringify(promptData, null, 2);
    console.info(`\n${chalk.bold.blue('Prompt data:')}\n${chalk.blue(promptDataString)}\n`);
}

export function logPromptTemplate(prompt: string) {
    logger.info(`\n${chalk.bold.gray('Prompt template:')}\n-------------------\n${chalk.gray(prompt)}\n-------------------\n`);
}

export function logConstructedPrompt(prompt: string): void {
    logger.info(`${chalk.bold.yellow('Prompt:')}\n-------------------\n${chalk.yellow(prompt)}\n-------------------\n`);
}

export function logCompletion(completion: string): void {
    logger.info(`${chalk.bold.green('Completion:')}\n-------------------\n${chalk.green(completion)}\n-------------------\n`);
}
