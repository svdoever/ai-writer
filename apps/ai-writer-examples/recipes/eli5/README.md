The **eli5** recipe is a very simple recipe that explain a topic to a 5 year old in a given language.

This recipe is to show-case the following features of the AI Writer Assistant:

- Define the available CLI parameters supported by the **cli5** recipe 
- Define a simple prompt template that can use parameter values 

## Example output

Given the command:

```cmd
npx ai-writer eli5 --topic divorce --language English --output "eli5/divorce"  --verbose
```

The following output is generated:

```text
Divorce is when two people who are married decide to stop being married.
```