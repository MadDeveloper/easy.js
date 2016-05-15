import fs from 'fs'

export default class Http {
    constructor( container ) {
        this._container = container
        this._logger    = container.getComponent( 'Logger' )
        this._request   = container.getComponent( 'Request' )
        this._response  = container.getComponent( 'Response' )
        this._status    = {
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
    }

    formatParams( params, setDefault ) {
        if ( typeof params === "undefined" ) {
            if ( typeof setDefault !== "undefined" ) {
                params = setDefault
            } else {
                params = undefined
            }
        }

        return params
    }

    ok( params ) {
        const res = this.response.scope
        res.status( this.status.ok ).json( this.formatParams( params ) )
    }

    created( params ) {
        const res = this.response.scope
        res.status( this.status.created ).json( this.formatParams( params ) )
    }

    notFound( params ) {
        const res = this.response.scope
        res.status( this.status.notFound ).json( this.formatParams( params ) )
    }

    notModified( params ) {
        const res = this.response.scope
        res.status( this.status.notModified ).json( this.formatParams( params ) )
    }

    gone( params ) {
        const res = this.response.scope
        res.status( this.status.gone ).json( this.formatParams( params ) )
    }

    unauthorized( params ) {
        const res = this.response.scope
        res.status( this.status.unauthorized ).json( this.formatParams( params ) )
    }

    methodNotAllowed( params ) {
        const res = this.response.scope
        res.status( this.status.methodNotAllowed ).json( this.formatParams( params ) )
    }

    unsupportedMediaType( params ) {
        const res = this.response.scope
        res.status( this.status.unsupportedMediaType ).json( this.formatParams( params ) )
    }

    tooManyRequests( params ) {
        const res = this.response.scope
        res.status( this.status.tooManyRequests ).json( this.formatParams( params ) )
    }

    noContent( params ) {
        const res = this.response.scope
        res.status( this.status.noContent ).json( this.formatParams( params ) )
    }

    internalServerError( params ) {
        const req = this.request.scope
        const res = this.response.scope
        const alertLog = '[{currentDate}] -- {remoteHostIp} -- {method} {originalUrl} {statusCode} -- ' + params + '\n'

        this.logger.alert( alertLog, {
            '{currentDate}': new Date().toUTCString(),
                '{remoteHostIp}': req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'],
            '{method}': req.method,
            '{originalUrl}': req.originalUrl,
            '{statusCode}': this.status.internalServerError
        })

        res.status( this.status.internalServerError ).json( this.formatParams( params ) )
    }

    badRequest( params ) {
        const res = this.response.scope
        res.status( this.status.badRequest ).json( this.formatParams( params ) )
    }

    unauthorized( params ) {
        const res = this.response.scope
        res.status( this.status.unauthorized ).json( this.formatParams( params ) )
    }

    forbidden( params ) {
        const res = this.response.scope
        res.status( this.status.forbidden ).json( this.formatParams( params ) )
    }

    attachment( filePath, options ) {
        const res = this.response.scope
        // res.attachment( filePath )
        res.sendFile( filePath, options, error => {
            if ( error ) {
                res.status( error.status ).end()
            }
        })
    }

    /*
     * Getters and setters
     */
    get container() {
        return this._container
    }

    set container( container ) {
        this._container = container
        return this
    }

    get logger() {
        return this._logger
    }

    set logger( logger ) {
        this._logger = logger
        return this
    }

    get request() {
        return this._request
    }

    set request( request ) {
        this._request = request
        return this
    }

    get response() {
        return this._response
    }

    set response( response ) {
        this._response = response
        return this
    }

    get status() {
        return this._status
    }

    set status( status ) {
        this._status = status
        return this
    }
}
