---
sidebar_position: 50
---

# Recipes

With AI Writer you, as a user, can easily define custom recipes to build the most powerful prompts to send to an OpenAI model to get a piece of content written by AI.

How the execution of a recipe works is explained in the section [How does AI Writer work](./how-does-aiwriter-work), and an explanation of the concepts used in AI Writer is provided in the section [Concepts](./concepts).

## The recipe folder

A recipe needs a collection of ingredients that are used to generate content. The name of the recipe is the name of the folder. The ingredients are the files within this folder.

The folder where recipes are stored is `recipes` and is located in the root of the project. When needed,this folder can be changed by setting the environment variable `AIWRITER_RECIPES_FOLDER` in the `.env` file of your AI Writer project.

## The recipe output

The folder where the generated content is stored is `storage` and is located in the root of the project. When needed, this folder can be changed by setting the environment variable `AIWRITER_STORAGE_FOLDER` in the `.env` file of your AI Writer project.

The execution of a recipe always results in a single file in the `storage` folder. The name of the file is specified by the mandatory `--output` option specified on the execution of a recipe. The specified file must be a relative path without a file extension, so for example for the `eli5` recipe, the path can be `eli5/elephant`. By default the output format is expected to be text (`txt`), and the file will get the extension `.txt`. This extension can be changed by specifying the `--output-format` option with the name of an output format defined in the [output-formats.json](./output-formats.json) file.

## The ingredients

The minimal set of ingredients are:

- `parameters.json` - the options that are available for the recipe and can be used in the `prompt.ejs` file (or the `getData.js` file)
- `prompt.ejs` - the EJS template that is used to generate the prompt that is sent to the OpenAI API
- `aimodel.json` - the configuration of the OpenAI API model that is used to generate the content

More advanced recipes can also optionally use:

- `functions.js` - JavaScript functions that can be used in the `prompt.ejs` file
- `getData.js` - the getData function that is used to get external data that can be used in the `prompt.ejs` file
- `dependencies.json` - the npm package dependencies that are used in the `functions.js` and `getData.js` files
- Any additional JavaScript files containing functions that are used in the `functions.js` and `getData.js` files

See the [Recipe ingredients](./category/recipe-ingredients) page for more information on the above-described files.    
