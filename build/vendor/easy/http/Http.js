'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Http(Container) {
    var _ref;

    var fs = require('fs');
    var Logger = Container.getDependency('Logger');
    var Request = Container.getDependency('Request');
    var Response = Container.getDependency('Response');

    function formatParams(params, setDefault) {
        if (typeof params === "undefined") {
            if (typeof setDefault !== "undefined") {
                params = setDefault;
            } else {
                params = undefined;
            }
        }

        return params;
    }

    return _ref = {
        status: {
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
        },

        ok: function ok(params) {
            var res = Response.getScope();
            res.status(this.status.ok).json(formatParams(params));
        },

        created: function created(params) {
            var res = Response.getScope();
            res.status(this.status.created).json(formatParams(params));
        },

        notFound: function notFound(params) {
            var res = Response.getScope();
            res.status(this.status.notFound).json(formatParams(params));
        },

        notModified: function notModified(params) {
            var res = Response.getScope();
            res.status(this.status.notModified).json(formatParams(params));
        },

        gone: function gone(params) {
            var res = Response.getScope();
            res.status(this.status.gone).json(formatParams(params));
        },

        unauthorized: function unauthorized(params) {
            var res = Response.getScope();
            res.status(this.status.unauthorized).json(formatParams(params));
        },

        methodNotAllowed: function methodNotAllowed(params) {
            var res = Response.getScope();
            res.status(this.status.methodNotAllowed).json(formatParams(params));
        },

        unsupportedMediaType: function unsupportedMediaType(params) {
            var res = Response.getScope();
            res.status(this.status.unsupportedMediaType).json(formatParams(params));
        },

        tooManyRequests: function tooManyRequests(params) {
            var res = Response.getScope();
            res.status(this.status.tooManyRequests).json(formatParams(params));
        },

        noContent: function noContent(params) {
            var res = Response.getScope();
            res.status(this.status.noContent).json(formatParams(params));
        },

        internalServerError: function internalServerError(params) {
            var req = Request.getScope();
            var res = Response.getScope();
            var alertLog = '[{currentDate}] -- {remoteHostIp} -- {method} {originalUrl} {statusCode} -- ' + params + '\n';

            Logger.alert(alertLog, {
                '{currentDate}': new Date().toUTCString(),
                '{remoteHostIp}': req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'],
                '{method}': req.method,
                '{originalUrl}': req.originalUrl,
                '{statusCode}': this.status.internalServerError
            });

            res.status(this.status.internalServerError).json(formatParams(params));
        },

        badRequest: function badRequest(params) {
            var res = Response.getScope();
            res.status(this.status.badRequest).json(formatParams(params));
        }

    }, _defineProperty(_ref, 'unauthorized', function unauthorized(params) {
        var res = Response.getScope();
        res.status(this.status.unauthorized).json(formatParams(params));
    }), _defineProperty(_ref, 'forbidden', function forbidden(params) {
        var res = Response.getScope();
        res.status(this.status.forbidden).json(formatParams(params));
    }), _defineProperty(_ref, 'attachment', function attachment(filePath, options) {
        var res = Response.getScope();
        // res.attachment( filePath );
        res.sendFile(filePath, options, function (error) {
            if (error) {
                res.status(error.status).end();
            }
        });
    }), _ref;
}

module.exports = Http;