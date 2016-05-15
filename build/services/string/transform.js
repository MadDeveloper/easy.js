'use strict';

module.exports = {
    asSnakeCase: function asSnakeCase(originalName) {
        var formatedName = originalName;

        formatedName = formatedName.trim();
        formatedName = this.cleanAccents(formatedName);
        formatedName = formatedName.replace(/[-!#$€£¤§<>%&~=+'"°%`.,;:/@\(\)\\\{\[\]\}]/gi, '');
        formatedName = formatedName.replace(/ /g, '_');
        formatedName = formatedName.toLowerCase();

        return formatedName;
    },

    cleanAccents: function cleanAccents(string) {
        return string.replace(/[^\w ]/gi, '');
    }
};