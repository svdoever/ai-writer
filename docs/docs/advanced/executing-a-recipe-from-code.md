---
sidebar_position: 40
---

# Execute from code

Executing a recipe from code.

A recipe can also be executed from TypeScript or JavaScript code. For example, to execute the `eli5` recipe for an elephant from JavaScript code, create the script `eli5-elephant.js`:

```javascript
#!/usr/bin/env node

aiwriter = require("ai-writer");

const result = aiwriter.executeRecipe("eli5", {
  topic: "elephant",
  output: `eli5/elephant`,
  verbose: true,
  dryRun: true,
});
```
And execute this script with the following command:

```bash
node ./eli5-elephant.js
```

On Linux or macOS make the script executable with the following command:

```bash
chmod +x ./eli5-elephant.js
```

And execute the script with the following command:

```bash
./eli5-elephant.js
```

## TypeScript

It is also possible to execute a recipe from TypeScript code. For example, to execute the `eli5` recipe for a collection of topics, create the script `./scripts/eli5-multiple.ts`:

```typescript
#!/usr/bin/env -S npx tsx

import { type RecipeOptionsBase, executeRecipe } from "ai-writer";

interface Eli5RecipeOptions extends RecipeOptionsBase {
    topic: string;
    words?: string;
    language?: string;
}

const topics = ["elephant", "giraffe", "lion", "tiger", "zebra"]
for (let i=0; i<topics.length; i++) {
    const topic = topics[i];
    executeRecipe<Eli5RecipeOptions>("eli5", { 
        topic,
        output: `eli5/${topic}`,
        verbose: true,
        debug: true,
        dryRun: true
    });
}
```

Note that the TypeScript file starts with `#!/usr/bin/env -S npx tsx`, which makes the script executable on Linux or macOS by executing the following command:

```bash
chmod +x ./scripts/eli5-multiple.ts
```

And execute the script with the following command:

```bash
./scripts/eli5-elephant.ts
```

On windows you can execute the TypeScript application using `npx tsx ./scripts/eli5-multiple.ts`.

Note that when using `npx tsx <file>`, the path to the file must be specified relative to the root of the project (the folder where the file `package.json` lives). If `tsx` is installed globally (`npm install tsx -g`), you can directly execute `tsx eli5-multiple.ts`. 