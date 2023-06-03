---
sidebar_position: 3
---

# aiconfig.json

The configuration of the AI model.

The `aiconfig.json file contains the model configuration of a recipe. The model configuration is used by AI Writer in the interaction with the OpenAI API.

The `aiconfig.json` file looks something like this:

```json
{
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
```

There are two types of completions: `completion` and `chat.completion`. The `completion` type is used for completion models like `text-davinci-003`, and the `chat.completion` type is used for chatbot models that are also really good at completion like `gtp-3.5-turbo` and `gpt-4`.

See the [OpenAI API documentation](https://platform.openai.com/docs/api-reference/completions/create) for more information about the model configuration fields.