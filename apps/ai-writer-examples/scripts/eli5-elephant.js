#!/usr/bin/env node

aiwriter = require("ai-writer");

const result = aiwriter.executeRecipe("eli5", {
  topic: "elephant",
  output: `eli5/elephant`,
  verbose: true,
  dryRun: true,
});
