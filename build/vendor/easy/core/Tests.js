'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tests = function () {
    function Tests(container) {
        _classCallCheck(this, Tests);

        this._request = container.getComponent('Request');
        this._response = container.getComponent('Response');
        this._bundleManager = container.getComponent('BundleManager');
        this._database = container.getComponent('Database').connection;

        this.run();
    }

    _createClass(Tests, [{
        key: 'run',
        value: function run() {}

        /*
         * Getters and setters
         */

    }, {
        key: 'container',
        get: function get() {
            return this._bundleManager.container;
        }
    }, {
        key: 'request',
        get: function get() {
            return this._request;
        }
    }, {
        key: 'response',
        get: function get() {
            return this._response;
        }
    }, {
        key: 'bundleManager',
        get: function get() {
            return this._bundleManager;
        }
    }, {
        key: 'database',
        get: function get() {
            return this._database;
        }
    }]);

    return Tests;
}();

exports.default = Tests;