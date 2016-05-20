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

        this._database = container.getComponent('Database');
        this._request = container.getComponent('Request');
        this._response = container.getComponent('Response');
        this._bundleManager = container.getComponent('BundleManager');
        this._router = this._bundleManager.router;
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
        value: function doesRequiredElementExists(element, options) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var requireBy = null;
                var optionsFetch = null;

                if (options instanceof Object && !(options instanceof Array)) {
                    requireBy = options.requireBy;
                    optionsFetch = options.options;
                } else {
                    requireBy = options;
                }

                var elementRepository = _this.bundleManager.getFactory(element).getRepository();

                elementRepository.read(requireBy, optionsFetch).then(function (element) {

                    if (element) {

                        resolve(element);
                    } else {
                        _this.response.notFound();
                    }
                }).catch(function (error) {
                    _this.response.internalServerError(error);
                });
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
        key: 'container',
        get: function get() {
            return this.bundleManager.container;
        }
    }]);

    return Controller;
}();

exports.default = Controller;