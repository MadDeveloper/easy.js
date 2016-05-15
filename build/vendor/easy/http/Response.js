"use strict";

function Response() {
    return {
        responseScope: null,

        registerResponseScope: function registerResponseScope(response) {
            this.responseScope = response;
        },

        getScope: function getScope() {
            return this.responseScope;
        }
    };
}

module.exports = Response;