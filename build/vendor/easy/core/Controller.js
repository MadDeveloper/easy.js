'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller(container) {
        _classCallCheck(this, Controller);

        this._container = container;
        this._bundleManager = this._container.getComponent('BundleManager');
        this._router = this._container.router;
        this._database = this._container.database;
        this._http = this._container.getComponent('Http');
        this._request = this._container.getComponent('Request');
        this._response = this._container.getComponent('Response');
    }

    _createClass(Controller, [{
        key: 'verifyParams',
        value: function verifyParams(required, params) {
            var verified = true;

            for (var requiredParam in required) {
                var optional = required[requiredParam].optional;

                if (!params.hasOwnProperty(required[requiredParam].property)) {
                    if (!optional) {
                        verified = false;
                        break;
                    }
                } else if (_typeof(params[required[requiredParam].property]) !== required[requiredParam].typeExpected) {
                    if (required[requiredParam].typeExpected === 'number') {
                        if (!params[required[requiredParam].property].isNumber()) {
                            verified = false;
                            break;
                        }
                    } else {
                        verified = false;
                        break;
                    }
                }
            }

            return verified;
        }
    }, {
        key: 'isNumber',
        value: function isNumber(number) {
            return typeof number === "number" || typeof number === 'string' && number.isNumber();
        }
    }, {
        key: 'parsePatchParams',
        value: function parsePatchParams() {
            try {
                return JSON.parse(this.request.scope.rawBody);
            } catch (error) {}
        }
    }, {
        key: 'isPatchRequestWellParameterized',
        value: function isPatchRequestWellParameterized() {
            return this.request.scope.rawBody.length > 0;
        }
    }, {
        key: 'doesRequiredElementExists',
        value: function doesRequiredElementExists(element, options, callback) {
            var _this = this;

            var requireBy = null;
            var optionsFetch = null;

            if (options instanceof Object && !(options instanceof Array)) {
                requireBy = options.requireBy;
                optionsFetch = options.options;
            } else {
                requireBy = options;
            }

            var elementRepository = this.bundleManager.getFactory(element.capitalizeFirstLetter()).getRepository();

            elementRepository.read(requireBy, optionsFetch).then(function (element) {

                if (element) {

                    callback(element);
                } else {
                    _this.response.notFound();
                }
            }).catch(function (error) {
                _this.response.internalServerError(error);
            });
        }
    }, {
        key: 'isDevEnv',
        value: function isDevEnv() {
            return 'development' === process.env.NODE_ENV;
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
        key: 'container',
        get: function get() {
            return this._container;
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
    }, {
        key: 'http',
        get: function get() {
            return this._http;
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
    }]);

    return Controller;
}();

exports.default = Controller;