'use strict';

var fs = require('fs');

function Kernel() {
    return {
        appName: '',

        componentsLoaded: {},

        path: {
            src: '',
            Bundles: ''
        },

        init: function init(root, config) {
            this.path.src = root + '/src';
            this.path.Bundles = this.path.src + '/Bundles';
            this.appName = config.app.name;

            return this;
        },

        load: function load(component, extension) {
            if ("undefined" === typeof this.componentsLoaded[component]) {
                var componentExtension = extension ? extension : 'js';
                var componentPath = __dirname + '/' + component + '.' + componentExtension;
                if (fs.statSync(componentPath).isFile()) {
                    this.componentsLoaded[component] = new require(componentPath);
                }
            }

            return this.componentsLoaded[component];
        },

        getAppName: function getAppName() {
            return this.appName;
        },

        getEnv: function getEnv() {
            return process.env.NODE_ENV;
        },

        isDevEnv: function isDevEnv() {
            return this.getEnv().toLowerCase() === "development";
        },

        isProdEnv: function isProdEnv() {
            return !this.isDevEnv();
        }
    };
}

module.exports = Kernel;