"use strict";

function Request(appName) {
    return {
        requestScope: null,

        registerRequestScope: function registerRequestScope(request) {
            this.requestScope = request;
        },

        getScope: function getScope() {
            return this.requestScope;
        },

        getMethod: function getMethod() {
            return this.getScope().method;
        },

        getBody: function getBody() {
            return this.getScope().body;
        },

        getParams: function getParams() {
            return this.getScope().params;
        },

        getBodyParameter: function getBodyParameter(key) {
            return this.getBody()[key];
        },

        setBodyParameter: function setBodyParameter(key, value) {
            this.getBody()[key] = value;
        },

        getRouteParameter: function getRouteParameter(param) {
            return this.getParams()[param];
        },

        define: function define(property, value) {
            /*
             * Defining global app scope in request
             */
            if (!this.getScope().hasOwnProperty(this.getAppName())) {
                this.getScope()[this.getAppName()] = {};
            }

            /*
             * Defining or redefine property in app scope in request
             */
            this.getScope()[this.getAppName()][property] = value;

            return this;
        },

        find: function find(property) {
            if (this.getScope()[this.getAppName()].hasOwnProperty(property)) {
                return this.getScope()[this.getAppName()][property];
            } else {
                return undefined;
            }
        },

        /*
         * Aliases
         */
        getAppName: function getAppName() {
            return appName;
        }
    };
}

module.exports = Request;