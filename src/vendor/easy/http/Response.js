import Http from './Http'

export default class Response extends Http {
    constructor( container ) {
        super()

        this._scope     = null
        this._logger    = container.getComponent( 'Logger' )
        this._request   = container.getComponent( 'Request' )
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
        const res = this.scope
        res.status( this.status.ok ).json( this.formatParams( params ) )
    }

    created( params ) {
        const res = this.scope
        res.status( this.status.created ).json( this.formatParams( params ) )
    }

    notFound( params ) {
        const res = this.scope
        res.status( this.status.notFound ).json( this.formatParams( params ) )
    }

    notModified( params ) {
        const res = this.scope
        res.status( this.status.notModified ).json( this.formatParams( params ) )
    }

    gone( params ) {
        const res = this.scope
        res.status( this.status.gone ).json( this.formatParams( params ) )
    }

    unauthorized( params ) {
        const res = this.scope
        res.status( this.status.unauthorized ).json( this.formatParams( params ) )
    }

    methodNotAllowed( params ) {
        const res = this.scope
        res.status( this.status.methodNotAllowed ).json( this.formatParams( params ) )
    }

    unsupportedMediaType( params ) {
        const res = this.scope
        res.status( this.status.unsupportedMediaType ).json( this.formatParams( params ) )
    }

    tooManyRequests( params ) {
        const res = this.scope
        res.status( this.status.tooManyRequests ).json( this.formatParams( params ) )
    }

    noContent( params ) {
        const res = this.scope
        res.status( this.status.noContent ).json( this.formatParams( params ) )
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

        res.status( this.status.internalServerError ).json( this.formatParams( params ) )
    }

    badRequest( params ) {
        const res = this.scope
        res.status( this.status.badRequest ).json( this.formatParams( params ) )
    }

    forbidden( params ) {
        const res = this.scope
        res.status( this.status.forbidden ).json( this.formatParams( params ) )
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
