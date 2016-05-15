'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BundleManager = function () {
    function BundleManager(components) {
        _classCallCheck(this, BundleManager);

        this._kernel = components.kernel;
        this._database = components.database;
        this._router = components.router;
        this._bundlesDefinition = [];
        this._container = null;
    }

    _createClass(BundleManager, [{
        key: 'define',
        value: function define(bundle) {
            var bundleDirPath = this.getBundlesDirectory() + '/' + bundle;

            if (_fs2.default.statSync(bundleDirPath).isDirectory()) {
                this.bundlesDefinition.push(bundle);
            }

            return this;
        }
    }, {
        key: 'getFactory',
        value: function getFactory(bundle, params) {
            var factoryPath = this.getBundlesDirectory() + '/' + bundle + '/Factory.js';

            if (_fs2.default.statSync(factoryPath).isFile()) {
                return new (require(factoryPath))(this, params);
            }
        }
    }, {
        key: 'getRouting',
        value: function getRouting(bundle, params) {
            var routingPath = this.getBundlesDirectory() + '/' + bundle + '/config/routing.js';

            if (_fs2.default.statSync(routingPath).isFile()) {
                return require(routingPath)(this, params);
            }
        }
    }, {
        key: 'getBundlesDefinitionRouting',
        value: function getBundlesDefinitionRouting(params) {
            var routingPath = '';

            for (var i in this.bundlesDefinition) {
                routingPath = this.getBundlesDirectory() + '/' + bundles[i] + '/config/routing.js';

                if (_fs2.default.statSync(routingPath).isFile()) {
                    require(routingPath)(this, params);
                }
            }
        }
    }, {
        key: 'getContainer',
        value: function getContainer() {
            if (null === this.container) {
                this.container = new (this.kernel.getContainer())(this.kernel);
            }

            return this.container;
        }
    }, {
        key: 'getDatabase',
        value: function getDatabase() {
            return this.database.connection;
        }
    }, {
        key: 'getBundlesDirectory',
        value: function getBundlesDirectory() {
            return this.kernel.path.bundles;
        }

        /*
         * Getters and setter
         */

    }, {
        key: 'appName',
        get: function get() {
            return this.kernel.appName;
        }
    }, {
        key: 'kernel',
        get: function get() {
            return this._kernel;
        }
    }, {
        key: 'router',
        get: function get() {
            return this._router;
        },
        set: function set(router) {
            this._router = router;
            return this;
        }
    }, {
        key: 'database',
        get: function get() {
            return this._database;
        },
        set: function set(database) {
            this._database = database;
            return this;
        }
    }, {
        key: 'bundlesDefinition',
        get: function get() {
            return this._bundlesDefinition;
        }
    }, {
        key: 'container',
        get: function get() {
            return this._container;
        }
    }]);

    return BundleManager;
}();

exports.default = BundleManager;