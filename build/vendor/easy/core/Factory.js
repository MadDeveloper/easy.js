'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Factory = function () {
    function Factory(bundle, bundleManager) {
        _classCallCheck(this, Factory);

        this._currentBundle = bundle;
        this._bundleManager = bundleManager;
    }

    _createClass(Factory, [{
        key: 'getRepository',
        value: function getRepository(repository) {
            if (!repository) {
                repository = this.currentBundle;
            }

            var repositoryClass = require(this.getBundlePath() + '/entity/' + repository.capitalizeFirstLetter() + 'Repository').default; /* .default is needed to patch babel exports.default build, require doesn't work, import do */
            return new repositoryClass(this);
        }
    }, {
        key: 'getForgedEntity',
        value: function getForgedEntity(paramsForForging) {
            return this.getModel()(paramsForForging);
        }
    }, {
        key: 'getModel',
        value: function getModel(model) {
            if (!model) {
                model = this.currentBundle;
            }

            var modelClass = require(this.getBundlePath() + '/entity/' + model.capitalizeFirstLetter()).default; /* .default is needed to patch babel exports.default build, require doesn't work, import do */
            return new modelClass(this);
        }
    }, {
        key: 'getNewModel',
        value: function getNewModel() {
            return new (this.getModel())();
        }
    }, {
        key: 'getCollection',
        value: function getCollection(fromModel) {
            return this.database.Collection.extend({
                model: this.getModel(fromModel)
            });
        }
    }, {
        key: 'getController',
        value: function getController(controller) {
            if (typeof controller === "undefined") {
                controller = 'Routing';
            }

            var controllerClass = require(this.getBundlePath() + '/controllers/' + controller.capitalizeFirstLetter() + 'Controller').default; /* .default is needed to patch babel exports.default build, require doesn't work, import do */
            return new controllerClass(this);
        }
    }, {
        key: 'getRootController',
        value: function getRootController() {
            return this.container.getComponent('Controller');
        }
    }, {
        key: 'getConfig',
        value: function getConfig(config) {
            var configClass = require(this.getBundlePath() + '/config/' + config).default; /* .default is needed to patch babel exports.default build, require doesn't work, import do */
            return configClass(this);
        }
    }, {
        key: 'getBundlePath',
        value: function getBundlePath() {
            return this.container.kernel.path.bundles + '/' + this.currentBundle;
        }

        /*
         * Getters and setters
         */

    }, {
        key: 'bundleManager',
        get: function get() {
            return this._bundleManager;
        }
    }, {
        key: 'currentBundle',
        get: function get() {
            return this._currentBundle;
        }
    }, {
        key: 'container',
        get: function get() {
            return this.bundleManager.container;
        }
    }, {
        key: 'database',
        get: function get() {
            return this.container.getComponent('Database').connection;
        }
    }]);

    return Factory;
}();

exports.default = Factory;