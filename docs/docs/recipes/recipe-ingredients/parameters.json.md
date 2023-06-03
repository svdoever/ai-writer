---
sidebar_position: 1
---

# parameters.json

The options for a recipe.

The power of a recipe is in the options. The `parameters.json` file contains the options that can be specified when using the recipe.

For example, for the `eli5` recipe this are the options:

```json
{
  "description": "Explain like I'm 5, what does this topic mean?",
  "options": [
    {
      "option": "--topic <topic>",
      "description": "The topic to explain",
      "required": true
    },
    {
      "option": "--language <language>",
      "description": "The language to explain it in",
      "required": false,
      "default": "English"
    },
    {
      "option": "--words <words>",
      "description": "The number of words to use in the explanation",
      "required": false,
      "default": 25
    }
  ]
}
```