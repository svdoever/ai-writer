---
sidebar_position: 3
---

# Prompt template file

The `prompt.ejs` file is a special file that contains the template for the prompt text. It is written in EJS (Embedded JavaScript) format, which allows for dynamic content generation. This file serves as a blueprint or guide for creating the final prompt by combining the template with specific data.

```ejs
Act like a schoolteacher who is the best
at explaining topics to young kids. 
Can you explain the topic <%= topic %> 
in <%= words %> words to a 5 year old 
in the simplest way possible?

Please explain the topic in the 
language <%= language %>.
```

The EJS template engine receives both the prompt template and the data. In this situation, the data corresponds to the values specified for the options. Consequently, the engine generates the final prompt based on the template and these data values.

The data is presented in [JSON](https://www.json.org/) format, which is a structured and easily readable format for computers.

> To explain JSON like you're five (ELI5), let's imagine you have a bunch of toys and you want to write down the information about each toy on a piece of paper. JSON is like a special way to write down that information so that other people or computers can easily understand and use it.
> JSON uses curly braces {} to represent objects and uses colons : to separate property names from their values. Multiple properties are separated by commas. So, a JSON representation of a toy might look like this:
> ```
> {
>   "name": "Teddy Bear",
>   "color": "brown",
>   "price": 19.99
> }
>```

AI Writer will use the data in JSON format in combination with the EJS prompt template to generate the prompt text. The data will be in the format:

```json
{
  "topic": "elephant",
  "language": "English",
  "words": 50,
  "output": "eli5/elephant.txt"
}
```

The EJS templating language is a powerful language that can be used to generate the prompt text given data. For more information, see the [EJS documentation](https://ejs.co/).