---
sidebar_position: 10
---

# The project folder

The home of your recipes.

The project folder is where you create your recipes, execute the recipes, and store the output of the recipes.

## The structure of the project folder

The project folder contains the following folders and files:

- `node_modules`: This folder contains the dependencies of the project. You should not change anything in this folder.
- `recipes`: This folder contains the recipes that you want to use. You can add recipes to this folder, or remove recipes from this folder. This folder initially contains some sample recipes for you to play with.
- `scripts`: This folder contains scripts that you can use to automate the execution of one or more recipes.  You can add scripts to this folder, or remove scripts from this folder. This folder initially contains some sample scripts for you to play with.
- `storage`: This folder contains the storage for the output (completion) of recipes, but files in storage can also be used as input for recipes.
- `.env`: This file contains the environment variables that are used by AI Writer.
- `.env.template`: This file contains the template for the `.env` file. You can copy this file to `.env` and set the environment variables in the `.env` file.
- `.gitignore`: This file contains the files and folders that are ignored by [git](https://git-scm.com/), a source control system. See [AI Writer and source-control](../advanced/aiwriter-and-sourcecontrol).
- `models.json`: This file contains the default models to be used for recipes, and model configurations. Override the default model configuration for a recipe using the `--model-override` option of the `ai-writer` command.
- `output-formats.json`: This file contains definitions for output formats that can be used by the `ai-writer` command. You can add additional output formats to this file, or override existing output formats. Override the default output format using the `--output-format` option of the `ai-writer` command.
`package-lock.json`: This file contains the dependencies of the project. You should not change anything in this file.
- `package.json`: This file contains the configuration of the project. The [package.json](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) file contains the metadata for the project.