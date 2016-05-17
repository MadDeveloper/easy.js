'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Http2 = require('./Http');

var _Http3 = _interopRequireDefault(_Http2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Request = function (_Http) {
    _inherits(Request, _Http);

    function Request(container) {
        _classCallCheck(this, Request);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Request).call(this, container));

        _this._appName = _this._container.kernel.appName;
        _this._scope = null;
        return _this;
    }

    _createClass(Request, [{
        key: 'getMethod',
        value: function getMethod() {
            return this.scope.method;
        }
    }, {
        key: 'getBody',
        value: function getBody() {
            return this.scope.body;
        }
    }, {
        key: 'getParams',
        value: function getParams() {
            return this.scope.params;
        }
    }, {
        key: 'getBodyParameter',
        value: function getBodyParameter(key) {
            return this.getBody()[key];
        }
    }, {
        key: 'setBodyParameter',
        value: function setBodyParameter(key, value) {
            this.getBody()[key] = value;
        }
    }, {
        key: 'getRouteParameter',
        value: function getRouteParameter(param) {
            return this.getParams()[param];
        }
    }, {
        key: 'define',
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
        key: 'find',
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
        key: 'appName',
        get: function get() {
            return this._appName;
        }
    }, {
        key: 'scope',
        get: function get() {
            return this._scope;
        },
        set: function set(scope) {
            this._scope = scope;
            return this;
        }
    }]);

    return Request;
}(_Http3.default);

exports.default = Request;