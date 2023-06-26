---
sidebar_position: 15
---

# The .env file

The place for secrets and folders.

The `.env` file is in the root of your AI Writer project folder. 

This file contains the environment variables that are used by AI Writer. 

When using the OpenAI API you will need to set the following environment variable:

- `OPENAI_API_KEY`

When using Azure OpenAI Service you will need to set the following environment variables:

- `AZURE_OPENAI_API_KEY`
- `AZURE_OPENAI_ENDPOINT`

The following variables can be changed as needed:

- `AIWRITER_RECIPES_FOLDER` - the folder where the recipes live. Default this is the `recipes` folder root of the AI Writer project
- `AIWRITER_STORAGE_FOLDER` - the folder where the results (completions) are written to
   
You can add additional environment variables to this file, when needed for your custom scripts.

Note that the file `.env.template` contains an example of the environment variables that can be set. Copy this file to `.env` and change where needed. 