---
sidebar_position: 20
---

# models.json

The available models.

The `models.json` file lives in the root of the project folder. This file contains model configurations, the default model to use, and configuration per recipe of the model to use.

## The file structure

The `models.json` file contains a JSON object with the following structure:

```json
{
    "defaultModel": "<model-name>",
    "recipeDefaultModel": {
        "<recipe-name>": "<model-name>",
        :
    },
    "modelConfigurations": {
       "<model-name>": {
            "description": "Description of the model",
            "provider": "Azure | OpenAI",
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
}
```

There are two types of completions for the Azure and OpenAI providers: `completion` and `chat.completion`. The `completion` type is used for completion models like `text-davinci-003`, and the `chat.completion` type is used for chatbot models that are also really good at completion like `gtp-3.5-turbo` and `gpt-4`.

See the [OpenAI API documentation](https://platform.openai.com/docs/api-reference/completions/create) for more information about the model configuration fields.

## Override the default model for a recipe

On execution of a recipe, the default model configuration can be overridden using the `--model-override` option of the `ai-writer` command. For example, to use the OpenAI `gpt-4` model, execute the following command:

```bash
npx ai-writer eli5 --topic elephant --model-override openai-gpt-4 --output eli5/elephant
```

## Example model.json file

The example `model.json` file delivered by AI-Writer has support for the following model configurations:

- `azure-gpt-4` - uses Azure OpenAI Service, `chat.completion`, and the `gpt-4` model (publish model by that name)
- `azure-gpt-35` - uses Azure OpenAI Service, `chat.completion`, and the `gpt-35-turbo` model (publish model by that name)
- `azure-davinci` - uses Azure OpenAI Service, `completion`, and the `text-davinci-003` model (publish model by that name)

- `openai-gpt-4` - uses OpenAI API, `chat.completion`, and the `gpt-4` model
- `openai-gpt-35` - uses OpenAI API, `chat.completion`, and the `gpt-3.5-turbo` model
- `openai-davinci` - uses OpenAI API, `completion`, and the `text-davinci-003` model

The `models.json` configuration is as follows:

```json
{
    "defaultModel": "azure-gpt-35",
    "recipeDefaultModel": {
        "eli5": "azure-gpt-35",
        "starwars-story": "azure-gpt-35",
        "bike-description": "azure-gpt-35"
    },
    "modelConfigurations": {
        "azure-gpt-4": {
            "description": "Azure OpenAI gpt-4",
            "provider": "Azure",
            "type": "chat.completion",
            "completion": {
                "model": "gpt-4",
                "max_tokens": 1000,
                "temperature": 0.0,
                "top_p": 1,
                "presence_penalty": 0.0,
                "frequency_penalty": 0.0
            }
        },
        "azure-gpt-35": {
            "description": "Azure OpenAI gpt-35-turbo",
            "provider": "Azure",
            "type": "chat.completion",
            "completion": {
                "model": "gpt35turbo",
                "max_tokens": 1000,
                "temperature": 0.0,
                "top_p": 1,
                "presence_penalty": 0.0,
                "frequency_penalty": 0.0
            }
        },
        "azure-davinci": {
            "description": "Azure OpenAI text-davinci-003",
            "provider": "Azure",
            "type": "completion",
            "completion": {
                "model": "text-davinci-003",
                "max_tokens": 1000,
                "temperature": 0.0,
                "top_p": 1,
                "presence_penalty": 0.0,
                "frequency_penalty": 0.0
            }
        },
        "openai-gpt-4": {
            "description": "OpenAI gpt-4",
            "provider": "OpenAI",
            "type": "chat.completion",
            "completion": {
                "model": "gpt-4",
                "max_tokens": 1000,
                "temperature": 0.0,
                "top_p": 1,
                "presence_penalty": 0.0,
                "frequency_penalty": 0.0
            }
        },
        "openai-gpt-35": {
            "description": "OpenAI gpt-3.5-turbo",
            "provider": "OpenAI",
            "type": "chat.completion",
            "completion": {
                "model": "gpt-3.5-turbo",
                "max_tokens": 1000,
                "temperature": 0.0,
                "top_p": 1,
                "presence_penalty": 0.0,
                "frequency_penalty": 0.0
            }
        },
        "openai-davinci": {
            "description": "OpenAI text-davinci-003",
            "provider": "OpenAI",
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
    }
}
```

Modify this file to your own needs.

## Azure OpenAI Service models

On Azure you need to deploy models explicitly by a name that you have to choose yourself. This deployment is done in **Azure AI Studio** under **Deployments**:

![Azure AI Studio - deployments](models.json/Azure%20AI%20Studio%20-%20no%20deployments%20yet.png)

When creating a model deployment you can select one of the base models. Where possible use the samen model name as the base models:

![Azure AI Studio - select model](models.json/Azure%20AI%20Studio%20-%20select%20model.png)

For each model that you want to access from the `models.json` file, create a corresponding model deployment:

![Azure AI Studio - multiple model deployments](models.json/Azure%20AI%20Studio%20-%20multiple-models-created.png)





