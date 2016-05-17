'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SkeletonFactory = function () {
    function SkeletonFactory(bundleManager) {
        _classCallCheck(this, SkeletonFactory);

        this._currentBundle = 'Skeleton';
        this._bundleManager = bundleManager;

        /* alias */
        this._container = this._bundleManager.container;
        this._database = this._bundleManager.database;
    }

    _createClass(SkeletonFactory, [{
        key: 'getRepository',
        value: function getRepository(repository) {
            if (!repository) {
                repository = this.currentBundle;
            }

            return require(__dirname + '/../entity/' + repository + 'Repository')(this);
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

            return new (require(__dirname + '/../entity/' + model))(this);
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

            return new (require(__dirname + '/../controllers/' + controller + 'Controller'))(this);
        }
    }, {
        key: 'getConfig',
        value: function getConfig(config) {
            return require(__dirname + '/../config/' + config)(this);
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
        key: 'database',
        get: function get() {
            return this._database;
        }
    }, {
        key: 'container',
        get: function get() {
            return this._container;
        }
    }]);

    return SkeletonFactory;
}();

exports.default = SkeletonFactory;