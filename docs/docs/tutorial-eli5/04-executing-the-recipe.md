---
sidebar_position: 4
---

# Executing the recipe

How to run the recipe from the CLI.

The recipe is executed utilizing the `ai-writer` tool. To invoke this tool, it is essential to supply the relevant options (referred to as parameters) for the recipe. The defined parameters can be found in the `parameters.json` file. For the `eli5` recipe, these parameters include: `topic`, `language`, and `words`. The tool can be invoked as follows:

```bash
ai-writer eli5 --topic elephant --output eli5/elephant
```

In this particular scenario, we will utilize the default values assigned to the `language` and `words` parameters. However, it is also possible to explicitly specify the desired values for these parameters, as demonstrated below:

```bash
ai-writer eli5 --topic elephant --language English --words 50 --output eli5/elephant
```

Note the used `--output` parameter. This parameter is used to specify the output file for the generated text. In this case, we will use the `eli5/elephant` file. By default, the output file is of type text, so the final output file will become `eli5/elephant.txt`.

# Using the ai-writer command

When `ai-writer` is installed globally, it can be used directly as described above.

When `ai-writer` is used as a dependency in a project, an npm run command `ai-writer` is available. When executing this run command, a special syntax must be used to pass the parameters to the `ai-writer` command. The syntax is as follows:

```bash
npx ai-writer -- eli5 --topic elephant --output eli5/elephant
```