---
sidebar_position: 4
---

# functions.js

Enhance prompt with functions.

Functions provide a powerful way to enhance the prompt with dynamic data. Functions export from `functions.js` can be used in the `prompt.ejs` file.

## Create and use functions

The `functions.js` file can export functions that will be made available in the data provided to the `prompt.js` file.

So for example if the `functions.js` file contains the following code:

```javascript
module.exports.getFullName = function (user) {
    return `${user.firstName} ${user.lastName}`;
};

module.exports.formatDate = function (date) {
    return date.toLocaleDateString();
};
```

The functions can be used in the `prompt.ejs` file like this:

```ejs
<%
    const user = {
        firstName: 'John',
        lastName: 'Doe'
    };
%>
My name is <%= getFullName(user) %>.
Today it is <%= formatDate(new Date()) %>.
```

Nothe that there must not be an overlap between the names of the options and the names of the exported functions.

## Use functions from other files

The `functions.js` file can also import functions from other files. For example, the `functions.js` file contains the following code:

```javascript
const { getAuthorPrefix } = require( "./util");

module.exports.getFullName = function (user) {
    return `${getAuthorPrefix("##")} - ${user.firstName} ${user.lastName}`;
};

module.exports.formatDate = function (date) {
    return date.toLocaleDateString();
};
```

and the `util.js` file contains the following code:

```javascript
module.exports.getAuthorPrefix = function(sep) {
  return sep + 'author' + sep;
}
```