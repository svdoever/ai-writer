---
sidebar_position: 12
---

# models.json

The `models.json` file lives in the root of the project folder. This file contains OpenAI model configurations that can override fields of the default model configuration as defined in the[`aiconfig.json`](./recipe-ingredients/aiconfig.json) file in the recipe folder. 

Override the default model configuration using the `--model-override` option of the `ai-writer` command.

The `models.json` file contains a JSON object with the following structure:

```json
{
  "model-name": {
    "type": "completion | chat.completion",
    "completion": {
        "model": "model-id",
        "temperature": 0.7,
        "max_tokens": 64,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
    }
  }
}
```

All fields are optional, and the specified fields are merged with the default model configuration. The `stop` field is an array of strings that are used to stop the completion.
By default, the `models.json`` file contains the following model overrides for easy switching between the OpenAI models:

```json
{
    "gpt-4": {
        "type": "chat.completion",
        "completion": {
            "model": "gpt-4"
        }
    },
    "gpt-35": {
        "type": "chat.completion",
        "completion": {
            "model": "gpt-3.5-turbo"
        }
    },

    "davinci": {
        "type": "completion",
        "completion": {
            "model": "text-davinci-003"
        }
    }
}
```

On execution of a recipe, the default model configuration can be overridden using the `--model-override` option of the `ai-writer` command. For example, to use the `gpt-4` model, execute the following command:

```bash
npx ai-writer eli5 --topic elephant --model-override gpt-4 --output eli5/elephant
```