#!/usr/bin/env node
import "source-map-support/register";
import { RecipeOptionsBase } from "./RecipeOptionsBase";
export { RecipeOptionsBase } from "./RecipeOptionsBase";
export declare function executeRecipe<T extends RecipeOptionsBase>(recipe: string, options: T): Promise<string>;
