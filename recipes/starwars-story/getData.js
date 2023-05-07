const { getHeightInMeters } = require("./util");

module.exports.getData = async function (data) {
    const {default: fetch} = await import("node-fetch");
    const response = await fetch(`https://swapi.dev/api/people/${data.id}/`);
    const person = await response.json();
    person.height_in_meters = getHeightInMeters(person.height);
    return { ...data, person };
};