const { getBlaat } = require( "./util");

module.exports.getFullName = function (user) {
    return `${getBlaat("##")} - ${user.firstName} ${user.lastName}`;
};

module.exports.formatDate = function (date) {
    return date.toLocaleDateString();
};