"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function () {
    function Request(appName) {
        _classCallCheck(this, Request);

        this._appName = appName;
        this._scope = null;
    }

    _createClass(Request, [{
        key: "getMethod",
        value: function getMethod() {
            return this.scope.method;
        }
    }, {
        key: "getBody",
        value: function getBody() {
            return this.scope.body;
        }
    }, {
        key: "getParams",
        value: function getParams() {
            return this.scope.params;
        }
    }, {
        key: "getBodyParameter",
        value: function getBodyParameter(key) {
            return this.getBody()[key];
        }
    }, {
        key: "setBodyParameter",
        value: function setBodyParameter(key, value) {
            this.getBody()[key] = value;
        }
    }, {
        key: "getRouteParameter",
        value: function getRouteParameter(param) {
            return this.getParams()[param];
        }
    }, {
        key: "define",
        value: function define(property, value) {
            /*
             * Defining global app scope in request
             */
            if (!this.scope.hasOwnProperty(this.appName)) {
                this.scope[this.appName] = {};
            }

            /*
             * Defining or redefine property in app scope in request
             */
            this.scope[this.appName][property] = value;

            return this;
        }
    }, {
        key: "find",
        value: function find(property) {
            if (this.scope[this.appName].hasOwnProperty(property)) {
                return this.scope[this.appName][property];
            } else {
                return undefined;
            }
        }

        /*
         * Getters and setters
         */

    }, {
        key: "appName",
        get: function get() {
            return this._appName;
        }
    }, {
        key: "scope",
        get: function get() {
            return this._scope;
        },
        set: function set(scope) {
            this._scope = scope;
            return this;
        }
    }]);

    return Request;
}();

exports.default = Request;