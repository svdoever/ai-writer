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

## Supported options

Each parameter definition has the following options:

- `option`: required, string. The option definition for the recipe parameter. This can be a boolean option definition, e.g. `--boolean-option`, or a string option definition , e.g. `--string-option <value>`. 
- `description`: optional, string. Description of the parameter.
- `required`: optional, boolean, default value: `false`. Set to `true`` if the parameters is required for the recipe.
- `default`: optional, string|boolean. set to value to be used as default value for the parameter if the parameter is not specified for the recipe.
- `json`: optional, boolean, default value: `false`. Set to `true`` if the string value of a parameter should be interpreted as JSON. This means that the parameter value is parsed, and provided as an object to the prompt. 

Note that if a parameter has dashes in its name, like in `--my-brand <brand name>`, it will be available in the prompt as `myBrand`.

## The storage "moniker"
"moniker" refers to a specific identifier or prefix (st://) used to indicate a particular type of resource — in this case, a file in the storage folder. When the system sees this moniker at the beginning of a string value for a parameter, it knows to treat the following path as pointing to a file within a designated storage location rather than interpreting it as a regular string. This is essentially a way to differentiate various types of input or to guide the system's behavior when it encounters this prefix.

For example, if you use `--bicycle-options "st://vanmoof/S3/options.txt"`, the presence of the `st://`` moniker tells the system to look in the storage folder, specifically under the "vanmoof/S3/" path, and read the contents of the "options.txt" file. The system would then set a variable called `bicycleOptions` with the contents of that file that can be used in the prompt.

This concept is somewhat similar to how URLs work: the "http://" or "https://" monikers at the beginning of a web address tell your web browser that it's dealing with a HyperText Transfer Protocol resource, which it should retrieve over the Internet. In the same way, the st:// moniker instructs the system to look for a file in a specific location and read its contents.

Using files from storage in this way is a very powerful option, especially when used in combination with the `json: true` setting on a parameter, because data files can be prepared in te storage folder, and used by the recipes. 



