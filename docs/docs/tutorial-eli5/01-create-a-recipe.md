---
sidebar_position: 1
---

# Create a recipe

Create your first recipe.

To create a new recipe, create a new folder in the `recipes` folder. The folder name will be the name of the recipe.

In this tutorial, we will create a recipe that explains a topic to a 5 years old in a given number of words, in a given language.

If we would ask this at ChatGPT, we would type in the following question:

> **Act like a schoolteacher who is the best at explaining topics to young kids. Can you explain the topic <span style={{color: "blue"}}>elephant</span> in <span style={{color: "blue"}}>50</span> words to a 5 year old in the simplest way possible? Please explain the topic in the language <span style={{color: "blue"}}>English</span>.**

And ChatGTP will respond with something like:

> **An elephant is a big, grey animal with a long trunk. Elephants have big ears and four long legs. They use their trunk to pick up food and to drink water. Elephants live in Africa and Asia and they eat leaves, fruit, and grass. They are very strong and can carry heavy things. Elephants are very smart and they like to play.**


## Create the recipe folder

Create a new folder in the `recipes` folder. The folder name will be the name of the recipe. In this case, we will name it `eli5`.

In this folder we will create the following files:

- `parameters.json` - this file contains the options for the recipe
- `prompt.ejs` - this file contains the prompt template that will be used to generate the text
- `aiconfig.json` - this file contains the configuration for the AI model

This set of files in the minimal set that is needed to create a recipe.

