---
sidebar_position: 1
---

# Release notes

## Introduction

In the AI Writer release notes you can see what new features become available with each version.

### 1.0.46

Parameters now support the option to interpret string parameter as JSON using `json: true`. There is also support for the `st://` moniker in a string parameter, to reference to the contents of a file in the storage folder. See [parameters.json](recipes/recipe-ingredients/parameters.json) for more information.
### 1.0.45

It is now possible to use recipes directly from code, instead of doing a `shell.exec()` to execute AI Writer though the CLI. The `ai-writer` npm package now provides both a CLI and a function `executeRecipe()` that can be imported from the `ai-writer` package. See [Execute from code](advanced/executing-a-recipe-from-code) for more information.

### 1.0.44

Baseline version. Release notes will start from here.