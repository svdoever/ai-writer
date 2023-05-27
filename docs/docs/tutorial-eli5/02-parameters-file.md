---
sidebar_position: 2
---

# Parameters file

The parameters file defines the options for the recipe. The values specified for the options are used 
to generate the prompt, based on the prompt template `prompt.ejs`.

The parameters file is a JSON file. The file name is `parameters.json`.

For this recipe, we need a topic, amount of words, and a language. We will create the following parameters:

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

