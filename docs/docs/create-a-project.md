---
sidebar_position: 10
---

# Create a project

When working with AI Writer, you will need to create a project. A project is a folder that contains the recipes that you want to use. You can create a project by executing the following command in a terminal window:
    
```bash
npx create-ai-writer-project my-project
```

This will create a new project in the folder `my-project`. You can also specify a path to create the project in a different folder:

```bash
npx create-ai-writer-project ../../my-project
```

Now change into the new project folder by running `cd my-project` in your terminal. 

You can now run `npx ai-writer` to start the AI Writer tool and see the installed recipes.

Run `npx ai-writer <recipe> --help` to see the options for the given recipe.

To actually use a recipe, copy the file `.env.template` to `.env` and set the `OPENAI_API_KEY` variable to your OpenAI API key. You can find your API key on the [OpenAI dashboard](https://platform.openai.com/account/api-keys).