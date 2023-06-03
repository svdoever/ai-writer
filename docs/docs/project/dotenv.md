---
sidebar_position: 15
---

# The .env file

The place for secrets and folders.

The `.env` file is in the root of your AI Writer project folder. 

This file contains the environment variables that are used by AI Writer. 
Mandatory variables are:

- `OPENAI_API_KEY`
- 
  The following variables can be changed as needed:
  
  - `AIWRITER_RECIPES_FOLDER` - the folder where the recipes live. Default this is the `recipes` folder root of the AI Writer project
  - `AIWRITER_STORAGE_FOLDER` - the folder where the results (completions) are written to
   
You can add additional environment variables to this file, when needed for your custom scripts.