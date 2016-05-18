'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = function () {
    function Service(container) {
        _classCallCheck(this, Service);

        this._request = container.getComponent('Request');
        this._response = container.getComponent('Response');
        this._bundleManager = container.getComponent('BundleManager');
        this._router = this._bundleManager.router;
        this._database = this._bundleManager.database;

        this.load();
    }

    _createClass(Service, [{
        key: 'load',
        value: function load() {}

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
        key: 'router',
        get: function get() {
            return this._router;
        }
    }, {
        key: 'database',
        get: function get() {
            return this._database;
        }
    }]);

    return Service;
}();

exports.default = Service;