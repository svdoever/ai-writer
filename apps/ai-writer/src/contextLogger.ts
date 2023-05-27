import * as logger from "loglevel";
import chalk from "chalk";

export function logRecipe(recipe: string): void {
    logger.info(`${chalk.bold.blue('Recipe:')} ${chalk.blue(recipe)}`);
}

export function logOptions(options: unknown): void {
    const optionsString = JSON.stringify(options, null, 2);
    logger.info(`${chalk.bold.blue('Options:')}\n${chalk.blue(optionsString)}\n`);
}

export function logPromptData(promptData: unknown): void {
    const promptDataString = JSON.stringify(promptData, null, 2);
    logger.info(`${chalk.bold.blue('Prompt data:')}\n${chalk.blue(promptDataString)}\n`);
}

export function logPromptTemplate(prompt: string) {
    logger.info(`${chalk.bold.gray('Prompt template:')}\n-------------------\n${chalk.gray(prompt.trim())}\n-------------------\n`);
}

export function logConstructedPrompt(prompt: string): void {
    logger.info(`${chalk.bold.hex("#FFA500")('Prompt:')}\n-------------------\n${chalk.hex("#FFA500")(prompt.trim())}\n-------------------\n`);
}

export function logCompletion(completion: string, showForce: boolean): void {
    const logFunc = showForce ? console.log : logger.info;
    logFunc(`${chalk.bold.green('Completion:')}\n-------------------\n${chalk.green(completion)}\n-------------------\n`);
}
