'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kernel = function () {
    function Kernel() {
        _classCallCheck(this, Kernel);

        this._appName = '';
        this._componentsLoaded = {};
        this.path = {
            root: '',
            bundles: '',
            services: '',
            config: '',
            vendor: ''
        };
    }

    _createClass(Kernel, [{
        key: 'init',
        value: function init(root, config) {
            this.path.root = root;
            this.path.bundles = this.path.root + '/bundles';
            this.path.services = this.path.root + '/services';
            this.path.config = this.path.root + '/config';
            this.path.vendor = this.path.root + '/vendor';

            this.appName = config.app.name;

            return this;
        }
    }, {
        key: 'load',
        value: function load(component) {
            if ("undefined" === typeof this.componentsLoaded[component]) {
                var componentPath = __dirname + '/' + component + '.js';

                if (_fs2.default.statSync(componentPath).isFile()) {
                    this.storeComponent(component, componentPath);
                }
            }

            return this.componentsLoaded[component];
        }
    }, {
        key: 'storeComponent',
        value: function storeComponent(component, path) {
            this.componentsLoaded[component] = require(path);
            return this;
        }
    }, {
        key: 'getContainer',
        value: function getContainer() {
            return this.load('Container');
        }
    }, {
        key: 'getEnv',
        value: function getEnv() {
            return process.env.NODE_ENV;
        }
    }, {
        key: 'isDevEnv',
        value: function isDevEnv() {
            return "development" === this.getEnv().toLowerCase();
        }
    }, {
        key: 'isProdEnv',
        value: function isProdEnv() {
            return !this.isDevEnv();
        }

        /*
         * Getters and setters
         */

    }, {
        key: 'appName',
        get: function get() {
            return this._appName;
        },
        set: function set(appName) {
            this._appName = appName;
            return this;
        }
    }, {
        key: 'componentsLoaded',
        get: function get() {
            return this._componentsLoaded;
        }
    }, {
        key: 'path',
        get: function get() {
            return this._path;
        },
        set: function set(path) {
            this._path = path;
            return this;
        }
    }]);

    return Kernel;
}();

exports.default = Kernel;