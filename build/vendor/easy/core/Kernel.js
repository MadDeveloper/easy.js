'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kernel = function () {
    function Kernel() {
        _classCallCheck(this, Kernel);

        this._appName = '';
        this._container = null;
        this._path = {
            root: '',
            bin: '',
            bundles: '',
            config: '',
            lib: '',
            services: '',
            vendor: ''
        };
    }

    _createClass(Kernel, [{
        key: 'init',
        value: function init(root, config) {
            this.path.root = root;
            this.path.bin = this.path.root + '/bin';
            this.path.bundles = this.path.root + '/bundles';
            this.path.config = this.path.root + '/config';
            this.path.lib = this.path.root + '/lib';
            this.path.services = this.path.root + '/services';
            this.path.vendor = this.path.root + '/vendor';
            this.path.easy = this.path.vendor + '/easy';

            this.appName = config.app.name;

            this.initContainer();

            return this;
        }
    }, {
        key: 'initContainer',
        value: function initContainer() {
            this._container = new _Container2.default(this);
            this.container.loadComponents();
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
        key: 'container',
        get: function get() {
            return this._container;
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