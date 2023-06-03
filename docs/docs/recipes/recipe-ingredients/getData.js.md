---
sidebar_position: 6
---

# getData.js

Get data for your recipe.

Retrieving relevant data for a recipe can make the recipe really powerful. The `getData.js` file can export a function that will be called by AI Writer to retrieve the data.

The `getData.js` file should export a single `getData(data)` function that is async. The `data` parameter contains the options specified in the recipe and `getData()` can extend this data with additional data.

## Example getData function

```javascript
const { getHeightInMeters } = require("./util");

module.exports.getData = async function (data) {
    const {default: fetch} = await import("node-fetch");
    const response = await fetch(`https://swapi.dev/api/people/${data.id}/`);
    const person = await response.json();
    person.height_in_meters = getHeightInMeters(person.height);
    return { ...data, person };
};
```
and the `util.js` file contains the following code:

```javascript
module.exports.getHeightInMeters = function(heightInCemtimeters) {
  const heightInMeters = heightInCemtimeters / 100;
  const heightInMetersWithTwoDecimals = heightInMeters.toFixed(2);
  const textualResult = `${heightInMetersWithTwoDecimals} meter`;
  return textualResult;
}
```
