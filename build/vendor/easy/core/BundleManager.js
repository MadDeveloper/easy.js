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
    function BundleManager(container) {
        _classCallCheck(this, BundleManager);

        this._container = container;
        this._kernel = this._container.kernel;
        this._database = null;
        this._router = null;
        this._bundlesDefinition = [];
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
        value: function getFactory(bundle) {
            var factoryPath = this.getBundlesDirectory() + '/' + bundle + '/' + bundle.capitalizeFirstLetter() + 'Factory.js';

            if (_fs2.default.statSync(factoryPath).isFile()) {
                var factoryBundle = require(factoryPath).default; /* .default is needed to patch babel exports.default build, require doesn't work, import do */
                return new factoryBundle(this);
            }
        }
    }, {
        key: 'getRouting',
        value: function getRouting(bundle) {
            var routingPath = this.getBundlesDirectory() + '/' + bundle + '/config/routing.js';

            if (_fs2.default.statSync(routingPath).isFile()) {
                var routingBundle = require(routingPath).default; /* .default is needed to patch babel exports.default build, require doesn't work, import do */
                return routingBundle(this.getFactory(bundle));
            }
        }
    }, {
        key: 'getBundlesDefinitionRouting',
        value: function getBundlesDefinitionRouting() {
            var routingPath = '';

            for (var i in this.bundlesDefinition) {
                var bundle = this.bundlesDefinition[i];

                routingPath = this.getBundlesDirectory() + '/' + bundle + '/config/routing.js';

                if (_fs2.default.statSync(routingPath).isFile()) {
                    var routingBundle = require(routingPath).default; /* .default is needed to patch babel exports.default build, require doesn't work, import do */
                    routingBundle(this.getFactory(bundle));
                }
            }
        }
    }, {
        key: 'getBundlesDirectory',
        value: function getBundlesDirectory() {
            return this._kernel.path.bundles;
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
        key: 'router',
        get: function get() {
            return this._router;
        },
        set: function set(router) {
            this._router = router;
        }
    }, {
        key: 'database',
        get: function get() {
            return this._database;
        },
        set: function set(database) {
            this._database = database;
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