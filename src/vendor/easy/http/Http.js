/**
 * @class Http
 */
class Http {
    /**
     * @constructor
     */
    constructor() {
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
