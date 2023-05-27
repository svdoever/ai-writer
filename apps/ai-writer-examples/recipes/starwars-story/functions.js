const { getHeightInMeters } = require( "./util");

module.exports.getFullName = function (user) {
    return `${user.firstName} ${user.lastName}`;
};

module.exports.formatDate = function (date) {
    return date.toLocaleDateString();
};