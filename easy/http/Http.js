/**
 * @class Http
 */
class Http {
    /**
     * @constructor
     */
    constructor() {
        this._status = {
            continue: 100,
            switchingProtocols: 101,
            processing: 102,
            // Response to a successful GET, PUT, PATCH or DELETE. Can also be used for a POST that doesn't result in a creation
            ok: 200,
            // Response to a POST that results in a creation. Should be combined with a Location header pointing to the location of the new resource
            created: 201,
            accepted: 202,
            nonAuthoritativeInformation: 203,
            // Response to a successful request that won't be returning a body (like a DELETE request)
            noContent: 204,
            resetContent: 205,
            partialContent: 206,
            multiStatus: 207,
            alreadyReported: 208,
            IMUsed: 226,
            multipleChoices: 300,
            movedPermanently: 301,
            found: 302,
            seeOther: 303,
            // Used when HTTP caching headers are in play
            notModified: 304,
            useProxy: 305,
            temporaryRedirect: 307,
            permanentRedirect: 308,
            // The request is malformed, such as if the body does not parse
            badRequest: 400,
            // When no or invalid authentication details are provided. Also useful to trigger an auth popup if the API is used from a browser
            unauthorized: 401,
            paymentRequired: 402,
            // When authentication succeeded but authenticated user doesn't have access to the resource
            forbidden: 403,
            //  When a non-existent resource is requested
            notFound: 404,
            // When an HTTP method is being requested that isn't allowed for the authenticated user
            methodNotAllowed: 405,
            notAcceptable: 406,
            proxyAuthenticationRequired: 407,
            requestTimeout: 408,
            conflict: 409,
            // Indicates that the resource at this end point is no longer available. Useful as a blanket response for old API versions
            gone: 410,
            lengthRequired: 411,
            preconditionFailed: 412,
            payloadTooLarge: 413,
            requestURITooLong: 414,
            // If incorrect content type was provided as part of the request
            unsupportedMediaType: 415,
            requestedRangeNotSatisfiable: 416,
            expectationFailed: 417,
            misdirectedRequest: 421,
            // Used for validation errors
            unprocessableEntity: 422,
            locked: 423,
            failedDependency: 424,
            upgradeRequired: 426,
            preconditionRequired: 428,
            // When a request is rejected due to rate limiting
            tooManyRequests: 429,
            requestHeaderFieldsTooLarge: 431,
            connectionClosedWithoutResponse: 444,
            unavailableForLegalReasons: 451,
            clientClosedRequest: 499,
            // server error
            internalServerError: 500,
            notImplemented: 501,
            badGateway: 502,
            serviceUnavailable: 503,
            gatewayTimeout: 504,
            httpVersionNotSupported: 505,
            variantAlsoNegotiates: 506,
            insufficientStorage: 507,
            loopDetected: 508,
            notExtended: 510,
            networkAuthenticationRequired: 511,
            networkConnectTimeoutError: 599
        }

        this.methods = [
            'get',
            'post',
            'put',
            'patch',
            'delete'
        ]
    }

    /**
     * get - http status
     *
     * @returns {object}
     */
    get status() {
        return this._status
    }
}

module.exports = Http
