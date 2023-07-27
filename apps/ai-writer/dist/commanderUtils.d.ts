import { type Parameters } from "./parameters";
import { Command } from "commander";
export declare function createRecipeProgram(recipe: string, parameters: Parameters, func: (options: any) => Promise<void>): Command;
