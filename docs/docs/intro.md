---
sidebar_position: 1
---

# Welcome to AI Writer

## Introduction

AI Writer is designed to generate content through the power of artificial intelligence, 
much like utilizing ChatGPT for content creation. The quality of the content created by 
AI relies heavily on the clarity and specificity of the questions you present. This question is 
also called the "prompt". With AI Writer you have the tool to build powerful prompts.

## The AI Writer CLI

AI Writer is a command line tool (a CLI) that can be used to generate powerful prompts based on a **recipe**. 
A recipe is a set of instructions or guidelines that describe how to prepare or make something, 
typically a dish of prepared food, but in our case: the prompt. This prompt is sent to an AI model and
the result (the "completion") is written to a file.

## The AI Writer library

But the cool thing is that all recipes can not only be executed through the ai-writer CLI, but also through code. All recipes become available for execution through the `executeRecipe()` function for even more power at your fingertips.

## Recipe

A recipe has a name and a set of options. These options are passed to the recipe when we
execute the recipe. For example, the recipe `eli5`, *eli5* means "explain like I'm five", as described in the [eli5 tutorial](./category/tutorial---eli5-recipe) has options for 
the `topic` to explain, the number of `words` to use for the explanation, and the `language` 
to explain the topic in.

The `eli5` recipe can be executed as follows:

```bash
npx ai-writer eli5 --topic elephant --words 100 --language English --output eli5/elephant
```

This will execute the `eli5` recipe with the options `topic=elephant`, `words=100`, and `language=English`.
The result will be written to the file `eli5/elephant.txt` in the storage folder, and look something like this:

> **An elephant is a big, grey animal with a long trunk. Elephants have big ears and four long legs. 
> They use their trunk to pick up food and to drink water. Elephants live in Africa and Asia and 
> they eat leaves, fruit, and grass. They are very strong and can carry heavy things. 
> Elephants are very smart and they like to play.**

This works as follows:

![AI Writer](./diagrams/AI%20Writer%20recipe%20simple%20execution.excalidraw.png)

Note that the AI Writer command `ai-writer` is executed in a [terminal window]( ./advanced/terminal-window) and must always be executed from a folder within the project that we create when we start using AI Writer. Creating a project is explained in the [create a project](./create-a-project) section.

And if you want to execute the `eli5` recipe from your code, it is as simple as:

```javascript
executeRecipe("eli5", { topic: "elephant", output: "eli5/elephant" })
```
