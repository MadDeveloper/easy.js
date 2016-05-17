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

var Response = function (_Http) {
    _inherits(Response, _Http);

    function Response(container) {
        _classCallCheck(this, Response);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Response).call(this, container));

        _this._scope = null;
        _this._logger = _this._container.getComponent('Logger');
        _this._request = _this._container.getComponent('Request');
        return _this;
    }

    _createClass(Response, [{
        key: 'formatParams',
        value: function formatParams(params, setDefault) {
            if (typeof params === "undefined") {
                if (typeof setDefault !== "undefined") {
                    params = setDefault;
                } else {
                    params = undefined;
                }
            }

            return params;
        }
    }, {
        key: 'ok',
        value: function ok(params) {
            var res = this.scope;
            res.status(this.status.ok).json(this.formatParams(params));
        }
    }, {
        key: 'created',
        value: function created(params) {
            var res = this.scope;
            res.status(this.status.created).json(this.formatParams(params));
        }
    }, {
        key: 'notFound',
        value: function notFound(params) {
            var res = this.scope;
            res.status(this.status.notFound).json(this.formatParams(params));
        }
    }, {
        key: 'notModified',
        value: function notModified(params) {
            var res = this.scope;
            res.status(this.status.notModified).json(this.formatParams(params));
        }
    }, {
        key: 'gone',
        value: function gone(params) {
            var res = this.scope;
            res.status(this.status.gone).json(this.formatParams(params));
        }
    }, {
        key: 'unauthorized',
        value: function unauthorized(params) {
            var res = this.scope;
            res.status(this.status.unauthorized).json(this.formatParams(params));
        }
    }, {
        key: 'methodNotAllowed',
        value: function methodNotAllowed(params) {
            var res = this.scope;
            res.status(this.status.methodNotAllowed).json(this.formatParams(params));
        }
    }, {
        key: 'unsupportedMediaType',
        value: function unsupportedMediaType(params) {
            var res = this.scope;
            res.status(this.status.unsupportedMediaType).json(this.formatParams(params));
        }
    }, {
        key: 'tooManyRequests',
        value: function tooManyRequests(params) {
            var res = this.scope;
            res.status(this.status.tooManyRequests).json(this.formatParams(params));
        }
    }, {
        key: 'noContent',
        value: function noContent(params) {
            var res = this.scope;
            res.status(this.status.noContent).json(this.formatParams(params));
        }
    }, {
        key: 'internalServerError',
        value: function internalServerError(params) {
            var req = this.request.scope;
            var res = this.scope;
            var alertLog = '[{currentDate}] -- {remoteHostIp} -- {method} {originalUrl} {statusCode} -- ' + params + '\n';

            this.logger.alert(alertLog, {
                '{currentDate}': new Date().toUTCString(),
                '{remoteHostIp}': req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'],
                '{method}': req.method,
                '{originalUrl}': req.originalUrl,
                '{statusCode}': this.status.internalServerError
            });

            res.status(this.status.internalServerError).json(this.formatParams(params));
        }
    }, {
        key: 'badRequest',
        value: function badRequest(params) {
            var res = this.scope;
            res.status(this.status.badRequest).json(this.formatParams(params));
        }
    }, {
        key: 'unauthorized',
        value: function unauthorized(params) {
            var res = this.scope;
            res.status(this.status.unauthorized).json(this.formatParams(params));
        }
    }, {
        key: 'forbidden',
        value: function forbidden(params) {
            var res = this.scope;
            res.status(this.status.forbidden).json(this.formatParams(params));
        }
    }, {
        key: 'attachment',
        value: function attachment(filePath, options) {
            var res = this.scope;
            // res.attachment( filePath )
            res.sendFile(filePath, options, function (error) {
                if (error) {
                    res.status(error.status).end();
                }
            });
        }

        /*
         * Getters and setters
         */

    }, {
        key: 'scope',
        get: function get() {
            return this._scope;
        },
        set: function set(scope) {
            this._scope = scope;
            return this;
        }
    }, {
        key: 'logger',
        get: function get() {
            return this._logger;
        }
    }, {
        key: 'request',
        get: function get() {
            return this._request;
        }
    }]);

    return Response;
}(_Http3.default);

exports.default = Response;