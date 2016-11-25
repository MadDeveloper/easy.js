const Http  = require( './Http' )

/**
 * @class Response
 * @extends Http
 */
class Response extends Http {
    /**
     * constructor - description
     *
     * @param  {type} res     description
     * @param  {type} request description
     * @param  {type} logger  description
     * @returns {type}         description
     */
    constructor( res, request, logger ) {
        super()

        this._scope     = res
        this._logger    = logger
        this._request   = request
    }

    /**
     * formatParams - description
     *
     * @param  {type} params     description
     * @param  {type} setDefault description
     * @returns {type}            description
     */
    formatParams( params, setDefault ) {
        if ( typeof params === "undefined" ) {
            if ( typeof setDefault !== "undefined" ) {
                params = setDefault
            }
        }

        return params
    }

    /**
     * ok - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    ok( params ) {
        this.scope.status( this.status.ok ).json( params )
    }

    /**
     * created - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    created( params ) {
        this.scope.status( this.status.created ).json( params )
    }

    /**
     * notFound - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    notFound( params ) {
        this.scope.status( this.status.notFound ).json( params )
    }

    /**
     * notModified - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    notModified( params ) {
        this.scope.status( this.status.notModified ).json( params )
    }

    /**
     * gone - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    gone( params ) {
        this.scope.status( this.status.gone ).json( params )
    }

    /**
     * unauthorized - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    unauthorized( params ) {
        this.scope.status( this.status.unauthorized ).json( params )
    }

    /**
     * methodNotAllowed - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    methodNotAllowed( params ) {
        this.scope.status( this.status.methodNotAllowed ).json( params )
    }

    /**
     * unsupportedMediaType - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    unsupportedMediaType( params ) {
        this.scope.status( this.status.unsupportedMediaType ).json( params )
    }

    /**
     * unprocessableEntity - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    unprocessableEntity( params ) {
        this.scope.status( this.status.unprocessableEntity ).json( params )
    }

    /**
     * tooManyRequests - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    tooManyRequests( params ) {
        this.scope.status( this.status.tooManyRequests ).json( params )
    }

    /**
     * noContent - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    noContent( params ) {
        this.scope.status( this.status.noContent ).json( params )
    }

    /**
     * internalServerError - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    internalServerError( params ) {
        const req       = this.request.scope
        const alertLog  = `[{currentDate}] -- {remoteHostIp} -- {method} {originalUrl} {statusCode} -- ${params}\n`

        this._logger.alert( alertLog, {
            '{currentDate}': new Date().toUTCString(),
            '{remoteHostIp}': req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'],
            '{method}': req.method,
            '{originalUrl}': req.originalUrl,
            '{statusCode}': this.status.internalServerError
        })

        this.scope.status( this.status.internalServerError ).json( params )
    }

    /**
     * badRequest - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    badRequest( params ) {
        this.scope.status( this.status.badRequest ).json( params )
    }

    /**
     * forbidden - description
     *
     * @param  {type} params description
     * @returns {type}        description
     */
    forbidden( params ) {
        this.scope.status( this.status.forbidden ).json( params )
    }

    /**
     * attachment - description
     *
     * @param  {type} filePath description
     * @param  {type} options  description
     * @returns {type}          description
     */
    attachment( filePath, options ) {
        if ( options ) {
            this.scope.sendFile( filePath, options, error => {
                if ( error ) {
                    this.scope.status( error.status ).end()
                }
            })
        } else {
            this.scope.attachment( filePath )
        }
    }

    /**
     * get - description
     *
     * @returns {type}  description
     */
    get scope() {
        return this._scope
    }

    /**
     * set - description
     *
     * @param  {type} scope description
     * @returns {type}       description
     */
    set scope( scope ) {
        this._scope = scope
        return this
    }

    /**
     * get - description
     *
     * @returns {type}  description
     */
    get request() {
        return this._request
    }
}

module.exports = Response
