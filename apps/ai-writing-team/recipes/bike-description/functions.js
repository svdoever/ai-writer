const { getAuthorPrefix } = require( "./util");

module.exports.getFullName = function (user) {
    return `${getAuthorPrefix("##")} - ${user.firstName} ${user.lastName}`;
};

module.exports.formatDate = function (date) {
    return date.toLocaleDateString();
};