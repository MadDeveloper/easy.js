'use strict';

var fs = require('fs');

function BundleManager(Kernel, databaseConnector, router) {
    return {
        bundlesRegistered: [],

        Container: null,

        register: function register(bundle) {
            var bundleDirPath = this.getBundlesDir() + '/' + bundle;

            if (fs.statSync(bundleDirPath).isDirectory()) {
                this.bundlesRegistered.push(bundle);
            }

            return this;
        },

        getFactory: function getFactory(bundle, params) {
            var factoryPath = this.getBundlesDir() + '/' + bundle + '/Pattern/Factory.js';

            if (fs.statSync(factoryPath).isFile()) {
                return new (require(factoryPath))(this, params);
            }
        },

        getRouting: function getRouting(bundle, params) {
            var routingPath = this.getBundlesDir() + '/' + bundle + '/config/routing.js';

            if (fs.statSync(routingPath).isFile()) {
                return require(routingPath)(this, params);
            }
        },

        getBundlesRegisteredRouting: function getBundlesRegisteredRouting(params) {
            var bundles = this.getBundlesRegistered();
            var routingPath = '';

            for (var i in bundles) {
                routingPath = this.getBundlesDir() + '/' + bundles[i] + '/config/routing.js';

                if (fs.statSync(routingPath).isFile()) {
                    require(routingPath)(this, params);
                }
            }
        },

        getContainer: function getContainer() {
            if (null === this.Container) {
                this.Container = Kernel.load('Container')(Kernel);
            }
            return this.Container;
        },

        getDatabase: function getDatabase() {
            return databaseConnector.getConnection();
        },

        getBundlesDir: function getBundlesDir() {
            return Kernel.path.Bundles;
        },

        getBundlesRegistered: function getBundlesRegistered() {
            return this.bundlesRegistered;
        },

        getRouter: function getRouter() {
            return router;
        },

        /*
         * Aliases
         */
        getAppName: function getAppName() {
            return Kernel.getAppName();
        }
    };
}

module.exports = BundleManager;