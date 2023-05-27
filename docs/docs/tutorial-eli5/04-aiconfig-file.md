---
sidebar_position: 4
---

# AI config file

The AI config file contains the configuration for the AI model. The AI model is used to generate the completion text, given a prompt.

The AI config file is a JSON file. The file name is `aiconfig.json`.

The AI config file looks like:

```json
{
    "type": "completion",
    "completion": {
      "model": "text-davinci-003",
      "max_tokens": 1000,
      "temperature": 0.0,
      "top_p": 1,
      "presence_penalty": 0.0,
      "frequency_penalty": 0.0
    }
}
```
AI Writer is all about completion models. Completion models are models that generate text, given a prompt. The AI config file contains the configuration for the completion model. The type of completion is either `completion` or `chat.completion`, depending on the model used.

Currently the following models are the most interesting models supported:

| provider | Model | Type | Description |
| --- | --- | --- | --- |
| OpenAI | `gpt-4` | `chat.completion` | The GPT-4 model is the most powerful, but also the slowest, chat completion model currently available. It is the most expensive model to use. |
| OpenAI | `gpt-3.5-turbo` | `chat.completion` | The GPT 3.5 Turbo chat completion model is a powerful model that corresponds with the current free available ChatGPT. It is less expensive than the `gpt-4` model, and even less expensive than `text-davinci-003` |
| OpenAI | `text-davinci-003` | `completion` | The Davinci model is the most powerful completion model, but chat models like `gpt-3.5-turbo` can be used as very good completion models as well. |


See the documentation https://platform.openai.com/docs/api-reference/completions/create for more information on the different settings, and other settings that are available.
Note that AI Writer only uses the first produced completion.