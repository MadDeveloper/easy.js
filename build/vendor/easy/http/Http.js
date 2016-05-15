'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Http = function () {
    function Http(container) {
        _classCallCheck(this, Http);

        this._container = container;
        this._logger = container.getComponent('Logger');
        this._request = container.getComponent('Request');
        this._response = container.getComponent('Response');
        this._status = {
            // Response to a successful GET, PUT, PATCH or DELETE. Can also be used for a POST that doesn't result in a creation
            ok: 200,
            // Response to a POST that results in a creation. Should be combined with a Location header pointing to the location of the new resource
            created: 201,
            // Response to a successful request that won't be returning a body (like a DELETE request)
            noContent: 204,
            // Used when HTTP caching headers are in play
            notModified: 304,
            // The request is malformed, such as if the body does not parse
            badRequest: 400,
            // When no or invalid authentication details are provided. Also useful to trigger an auth popup if the API is used from a browser
            unauthorized: 401,
            // When authentication succeeded but authenticated user doesn't have access to the resource
            forbidden: 403,
            //  When a non-existent resource is requested
            notFound: 404,
            // When an HTTP method is being requested that isn't allowed for the authenticated user
            methodNotAllowed: 405,
            // Indicates that the resource at this end point is no longer available. Useful as a blanket response for old API versions
            gone: 410,
            // If incorrect content type was provided as part of the request
            unsupportedMediaType: 415,
            // Used for validation errors
            unprocessableEntity: 422,
            // When a request is rejected due to rate limiting
            tooManyRequests: 429,
            // server error
            internalServerError: 500
        };
    }

    _createClass(Http, [{
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
            var res = this.response.scope;
            res.status(this.status.ok).json(this.formatParams(params));
        }
    }, {
        key: 'created',
        value: function created(params) {
            var res = this.response.scope;
            res.status(this.status.created).json(this.formatParams(params));
        }
    }, {
        key: 'notFound',
        value: function notFound(params) {
            var res = this.response.scope;
            res.status(this.status.notFound).json(this.formatParams(params));
        }
    }, {
        key: 'notModified',
        value: function notModified(params) {
            var res = this.response.scope;
            res.status(this.status.notModified).json(this.formatParams(params));
        }
    }, {
        key: 'gone',
        value: function gone(params) {
            var res = this.response.scope;
            res.status(this.status.gone).json(this.formatParams(params));
        }
    }, {
        key: 'unauthorized',
        value: function unauthorized(params) {
            var res = this.response.scope;
            res.status(this.status.unauthorized).json(this.formatParams(params));
        }
    }, {
        key: 'methodNotAllowed',
        value: function methodNotAllowed(params) {
            var res = this.response.scope;
            res.status(this.status.methodNotAllowed).json(this.formatParams(params));
        }
    }, {
        key: 'unsupportedMediaType',
        value: function unsupportedMediaType(params) {
            var res = this.response.scope;
            res.status(this.status.unsupportedMediaType).json(this.formatParams(params));
        }
    }, {
        key: 'tooManyRequests',
        value: function tooManyRequests(params) {
            var res = this.response.scope;
            res.status(this.status.tooManyRequests).json(this.formatParams(params));
        }
    }, {
        key: 'noContent',
        value: function noContent(params) {
            var res = this.response.scope;
            res.status(this.status.noContent).json(this.formatParams(params));
        }
    }, {
        key: 'internalServerError',
        value: function internalServerError(params) {
            var req = this.request.scope;
            var res = this.response.scope;
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
            var res = this.response.scope;
            res.status(this.status.badRequest).json(this.formatParams(params));
        }
    }, {
        key: 'unauthorized',
        value: function unauthorized(params) {
            var res = this.response.scope;
            res.status(this.status.unauthorized).json(this.formatParams(params));
        }
    }, {
        key: 'forbidden',
        value: function forbidden(params) {
            var res = this.response.scope;
            res.status(this.status.forbidden).json(this.formatParams(params));
        }
    }, {
        key: 'attachment',
        value: function attachment(filePath, options) {
            var res = this.response.scope;
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
        key: 'container',
        get: function get() {
            return this._container;
        },
        set: function set(container) {
            this._container = container;
            return this;
        }
    }, {
        key: 'logger',
        get: function get() {
            return this._logger;
        },
        set: function set(logger) {
            this._logger = logger;
            return this;
        }
    }, {
        key: 'request',
        get: function get() {
            return this._request;
        },
        set: function set(request) {
            this._request = request;
            return this;
        }
    }, {
        key: 'response',
        get: function get() {
            return this._response;
        },
        set: function set(response) {
            this._response = response;
            return this;
        }
    }, {
        key: 'status',
        get: function get() {
            return this._status;
        },
        set: function set(status) {
            this._status = status;
            return this;
        }
    }]);

    return Http;
}();

exports.default = Http;