The **starwars-story** recipe enables you to write stories about the people from the Star Wars movies.
Information about a person is retrieved from the Star Wars API (https://swapi.dev/).

To see a list of available people, open the URL https://swapi.dev/api/people in your browser.

This recipe is to show-case the following features of the AI Writer Assistant:

- Define the available parameters supported by the **starwars-story** recipe 
- Powerful prompt templates that can use parameter values and functions to generate the story
- Define a `getData.js` file that can be used to async fetch external data
- Defining custom JavaScript functions in the `functions.js` file that can be used in the prompt template
- The use of functions in the `functions.js` or `getData.js file that are defined in other JavaScript files
- Configure external npm packages in the `dependencies.json` file that can be used by the `functions.js` or `getData.js` file
- OpenAI configuration settings

## Using npm packages

When npm packages are required from the code of the recipes, reference these from the file
`dependencies.json` in the recipe folder. This files looks like:

```json
{
    "node-fetch": "3.3.1"
}
```

## dynamically loading data

If the recipe needs an async call to retrieve data, this can not be done from 
the prompt code directly. Instead, the data should be retrieved by creating a 
`getData.js` file. This file should export a function that returns a promise.

For example: 

```javascript
module.exports.getData = async function (data) {
    const {default: fetch} = await import("node-fetch");
    const response = await fetch(`https://swapi.dev/api/people/${data.id}/`);
    const person = await response.json();
    person.height_in_meters = getHeightInMeters(person.height);
    return { ...data, person };
};
```

The returned data will be available in the prompt template as `data`.

## dynamic imports

Reference npm packages from the `functions.js` file using dynamic imports.

See https://elelad.medium.com/lazy-load-npm-packages-using-dynamic-import-fba19a44b1d


## Example output

Given the command:

```
npx ai-writer starwars-story --id 1 --story-line "Write a funny story about Star Wars that contains two jokes" --author-firstname "Serge" --author-lastname "van den Oever" --output "1 - Star Wars" --verbose
```

The following output is generated:

```
Once upon a time, there was a young jedi named Luke Skywalker. Born in 19BBY,
Luke was destined to be a great leader and protector of his people.

Luke's first mission began when he was sent to rescue Princess Leia from the
clutches of Darth Vader. But not before he had to use the Force to dodge
Stormtroopers and navigate the dangerous terrain of Tatooine. 

Along his journey, Luke encountered many strange creatures, and he was
especially surprised when he encountered a giant Wookiee. He asked the Wookiee
for directions, but he could only understand the Wookiee's grunts. Finally, Luke
gave up and said, "Nevermind, I'll just ask Google."

After a few more adventures, Luke finally reached his destination and rescued
Princess Leia. But when he returned to the rebel base, the rebels were surprised
to find out that Luke was only nineteen years old. 

The rebels were so impressed with Luke's bravery and courage that they gave him
a medal of honor. Luke smiled and said, "It's not the medal that matters, but
the age. I'm 19BBY strong!"

This story was written by Serge van den Oever and was published on 4/23/2023.
```

