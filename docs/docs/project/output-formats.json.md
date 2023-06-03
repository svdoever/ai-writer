---
sidebar_position: 30
---

# output-formats.json

Output configurations.

The `output-format.json` file lives in the root of the project folder. This file contains definitions of output formats that can be used by the `ai-writer` command.

The `output-formats.json` file contains a JSON object with the following structure:

```json
{
    "format-name": {
        "extension": "extension",
        "wrappedExtension": "wrapped-extension",
        "wrapSize": 80
    }
}
```

The `extension` field is the extension of the output file. The `wrappedExtension` field is the extension of the wrapped output file. The `wrapSize` field is the number of characters per line in the wrapped output file.

The `wrappedExtension` and `wrapSize` fields are optional. A `wrappedExtension` is only relevant for text files. The `wrapSize` field is only relevant for text files and is used to wrap the output text file to a maximum number of characters per line.
By default, the `output-formats.json`` file contains the following output formats:

```json
{
    "txt": {
        "extension": "txt",
        "wrappedExtension": "wrapped.txt",
        "wrapSize": 80
    }
}
```

On execution of a recipe, the default output format can be overridden using the `--output-format` option of the `ai-writer` command. For example, to use the `txt` model, execute for example the following command:

```bash
npx ai-writer eli5 --topic elephant --output-format txt --output eli5/elephant
```