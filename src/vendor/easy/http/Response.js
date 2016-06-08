import Http from './Http'

export default class Response extends Http {
    constructor( res, request, logger ) {
        super()

        this._scope     = res
        this._logger    = logger
        this._request   = request
    }

    formatParams( params, setDefault ) {
        if ( typeof params === "undefined" ) {
            if ( typeof setDefault !== "undefined" ) {
                params = setDefault
            }
        }

        return params
    }

    ok( params ) {
        const res = this.scope
        res.status( this.status.ok ).json( params )
    }

    created( params ) {
        const res = this.scope
        res.status( this.status.created ).json( params )
    }

    notFound( params ) {
        const res = this.scope
        res.status( this.status.notFound ).json( params )
    }

    notModified( params ) {
        const res = this.scope
        res.status( this.status.notModified ).json( params )
    }

    gone( params ) {
        const res = this.scope
        res.status( this.status.gone ).json( params )
    }

    unauthorized( params ) {
        const res = this.scope
        res.status( this.status.unauthorized ).json( params )
    }

    methodNotAllowed( params ) {
        const res = this.scope
        res.status( this.status.methodNotAllowed ).json( params )
    }

    unsupportedMediaType( params ) {
        const res = this.scope
        res.status( this.status.unsupportedMediaType ).json( params )
    }

    tooManyRequests( params ) {
        const res = this.scope
        res.status( this.status.tooManyRequests ).json( params )
    }

    noContent( params ) {
        const res = this.scope
        res.status( this.status.noContent ).json( params )
    }

    internalServerError( params ) {
        const req       = this.request.scope
        const res       = this.scope
        const alertLog  = `[{currentDate}] -- {remoteHostIp} -- {method} {originalUrl} {statusCode} -- ${params}\n`

        this.logger.alert( alertLog, {
            '{currentDate}': new Date().toUTCString(),
            '{remoteHostIp}': req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'],
            '{method}': req.method,
            '{originalUrl}': req.originalUrl,
            '{statusCode}': this.status.internalServerError
        })

        res.status( this.status.internalServerError ).json( params )
    }

    badRequest( params ) {
        const res = this.scope
        res.status( this.status.badRequest ).json( params )
    }

    forbidden( params ) {
        const res = this.scope
        res.status( this.status.forbidden ).json( params )
    }

    attachment( filePath, options ) {
        const res = this.scope
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
    get scope() {
        return this._scope
    }

    set scope( scope ) {
        this._scope = scope
        return this
    }

    get logger() {
        return this._logger
    }

    get request() {
        return this._request
    }
}
