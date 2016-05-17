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

    /*
     * Getters and setters
     */


    _createClass(Http, [{
        key: 'container',
        get: function get() {
            return this._container;
        }
    }, {
        key: 'status',
        get: function get() {
            return this._status;
        }
    }]);

    return Http;
}();

exports.default = Http;