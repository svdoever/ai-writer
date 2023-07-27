#!/usr/bin/env -S npx tsx

import { type RecipeOptionsBase, executeRecipe } from "ai-writer";

interface Eli5RecipeOptions extends RecipeOptionsBase {
    //topic: string;
    words?: string;
    language?: string;
}

const topics = ["elephant", "giraffe", "lion", "tiger", "zebra"]
for (let i=0; i<topics.length; i++) {
    const topic = topics[i];
    executeRecipe<Eli5RecipeOptions>("eli5", { 
        // topic,
        output: `eli5/${topic}`,
        verbose: true,
        debug: true,
        dryRun: true
    });
}