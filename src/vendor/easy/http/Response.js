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
     * continue - description
     *
     * @param  {type} params description
     */
    continue( params ) {
        this.scope.status( this.status.continue ).json( params )
    }

    /**
     * switchingProtocols - description
     *
     * @param  {type} params description
     */
    switchingProtocols( params ) {
        this.scope.status( this.status.switchingProtocols ).json( params )
    }

    /**
     * processing - description
     *
     * @param  {type} params description
     */
    processing( params ) {
        this.scope.status( this.status.processing ).json( params )
    }

    /**
     * ok - description
     *
     * @param  {type} params description
     */
    ok( params ) {
        this.scope.status( this.status.ok ).json( params )
    }

    /**
     * created - description
     *
     * @param  {type} params description
     */
    created( params ) {
        this.scope.status( this.status.created ).json( params )
    }

    /**
     * accepted - description
     *
     * @param  {type} params description
     */
    accepted( params ) {
        this.scope.status( this.status.accepted ).json( params )
    }

    /**
     * nonAuthoritativeInformation - description
     *
     * @param  {type} params description
     */
    nonAuthoritativeInformation( params ) {
        this.scope.status( this.status.nonAuthoritativeInformation ).json( params )
    }

    /**
     * noContent - description
     *
     * @param  {type} params description
     */
    noContent( params ) {
        this.scope.status( this.status.noContent ).json( params )
    }

    /**
     * resetContent - description
     *
     * @param  {type} params description
     */
    resetContent( params ) {
        this.scope.status( this.status.resetContent ).json( params )
    }

    /**
     * partialContent - description
     *
     * @param  {type} params description
     */
    partialContent( params ) {
        this.scope.status( this.status.partialContent ).json( params )
    }

    /**
     * multiStatus - description
     *
     * @param  {type} params description
     */
    multiStatus( params ) {
        this.scope.status( this.status.multiStatus ).json( params )
    }

    /**
     * alreadyReported - description
     *
     * @param  {type} params description
     */
    alreadyReported( params ) {
        this.scope.status( this.status.alreadyReported ).json( params )
    }

    /**
     * IMUsed - description
     *
     * @param  {type} params description
     */
    IMUsed( params ) {
        this.scope.status( this.status.IMUsed ).json( params )
    }

    /**
     * multipleChoices - description
     *
     * @param  {type} params description
     */
    multipleChoices( params ) {
        this.scope.status( this.status.multipleChoices ).json( params )
    }

    /**
     * movedPermanently - description
     *
     * @param  {type} params description
     */
    movedPermanently( params ) {
        this.scope.status( this.status.movedPermanently ).json( params )
    }

    /**
     * found - description
     *
     * @param  {type} params description
     */
    found( params ) {
        this.scope.status( this.status.found ).json( params )
    }

    /**
     * seeOther - description
     *
     * @param  {type} params description
     */
    seeOther( params ) {
        this.scope.status( this.status.seeOther ).json( params )
    }

    /**
     * notModified - description
     *
     * @param  {type} params description
     */
    notModified( params ) {
        this.scope.status( this.status.notModified ).json( params )
    }

    /**
     * useProxy - description
     *
     * @param  {type} params description
     */
    useProxy( params ) {
        this.scope.status( this.status.useProxy ).json( params )
    }

    /**
     * temporaryRedirect - description
     *
     * @param  {type} params description
     */
    temporaryRedirect( params ) {
        this.scope.status( this.status.temporaryRedirect ).json( params )
    }

    /**
     * permanentRedirect - description
     *
     * @param  {type} params description
     */
    permanentRedirect( params ) {
        this.scope.status( this.status.permanentRedirect ).json( params )
    }

    /**
     * badRequest - description
     *
     * @param  {type} params description
     */
    badRequest( params ) {
        this.scope.status( this.status.badRequest ).json( params )
    }

    /**
     * unauthorized - description
     *
     * @param  {type} params description
     */
    unauthorized( params ) {
        this.scope.status( this.status.unauthorized ).json( params )
    }

    /**
     * paymentRequired - description
     *
     * @param  {type} params description
     */
    paymentRequired( params ) {
        this.scope.status( this.status.paymentRequired ).json( params )
    }

    /**
     * forbidden - description
     *
     * @param  {type} params description
     */
    forbidden( params ) {
        this.scope.status( this.status.forbidden ).json( params )
    }

    /**
     * notFound - description
     *
     * @param  {type} params description
     */
    notFound( params ) {
        this.scope.status( this.status.notFound ).json( params )
    }

    /**
     * methodNotAllowed - description
     *
     * @param  {type} params description
     */
    methodNotAllowed( params ) {
        this.scope.status( this.status.methodNotAllowed ).json( params )
    }

    /**
     * notAcceptable - description
     *
     * @param  {type} params description
     */
    notAcceptable( params ) {
        this.scope.status( this.status.notAcceptable ).json( params )
    }

    /**
     * proxyAuthenticationRequired - description
     *
     * @param  {type} params description
     */
    proxyAuthenticationRequired( params ) {
        this.scope.status( this.status.proxyAuthenticationRequired ).json( params )
    }

    /**
     * requestTimeout - description
     *
     * @param  {type} params description
     */
    requestTimeout( params ) {
        this.scope.status( this.status.requestTimeout ).json( params )
    }

    /**
     * conflict - description
     *
     * @param  {type} params description
     */
    conflict( params ) {
        this.scope.status( this.status.conflict ).json( params )
    }

    /**
     * gone - description
     *
     * @param  {type} params description
     */
    gone( params ) {
        this.scope.status( this.status.gone ).json( params )
    }

    /**
     * lengthRequired - description
     *
     * @param  {type} params description
     */
    lengthRequired( params ) {
        this.scope.status( this.status.lengthRequired ).json( params )
    }

    /**
     * preconditionFailed - description
     *
     * @param  {type} params description
     */
    preconditionFailed( params ) {
        this.scope.status( this.status.preconditionFailed ).json( params )
    }

    /**
     * payloadTooLarge - description
     *
     * @param  {type} params description
     */
    payloadTooLarge( params ) {
        this.scope.status( this.status.payloadTooLarge ).json( params )
    }

    /**
     * requestURITooLong - description
     *
     * @param  {type} params description
     */
    requestURITooLong( params ) {
        this.scope.status( this.status.requestURITooLong ).json( params )
    }

    /**
     * unsupportedMediaType - description
     *
     * @param  {type} params description
     */
    unsupportedMediaType( params ) {
        this.scope.status( this.status.unsupportedMediaType ).json( params )
    }

    /**
     * requestedRangeNotSatisfiable - description
     *
     * @param  {type} params description
     */
    requestedRangeNotSatisfiable( params ) {
        this.scope.status( this.status.requestedRangeNotSatisfiable ).json( params )
    }

    /**
     * expectationFailed - description
     *
     * @param  {type} params description
     */
    expectationFailed( params ) {
        this.scope.status( this.status.expectationFailed ).json( params )
    }

    /**
     * misdirectedRequest - description
     *
     * @param  {type} params description
     */
    misdirectedRequest( params ) {
        this.scope.status( this.status.misdirectedRequest ).json( params )
    }

    /**
     * unprocessableEntity - description
     *
     * @param  {type} params description
     */
    unprocessableEntity( params ) {
        this.scope.status( this.status.unprocessableEntity ).json( params )
    }

    /**
     * locked - description
     *
     * @param  {type} params description
     */
    locked( params ) {
        this.scope.status( this.status.locked ).json( params )
    }

    /**
     * failedDependency - description
     *
     * @param  {type} params description
     */
    failedDependency( params ) {
        this.scope.status( this.status.failedDependency ).json( params )
    }

    /**
     * upgradeRequired - description
     *
     * @param  {type} params description
     */
    upgradeRequired( params ) {
        this.scope.status( this.status.upgradeRequired ).json( params )
    }

    /**
     * preconditionRequired - description
     *
     * @param  {type} params description
     */
    preconditionRequired( params ) {
        this.scope.status( this.status.preconditionRequired ).json( params )
    }

    /**
     * tooManyRequests - description
     *
     * @param  {type} params description
     */
    tooManyRequests( params ) {
        this.scope.status( this.status.tooManyRequests ).json( params )
    }

    /**
     * requestHeaderFieldsTooLarge - description
     *
     * @param  {type} params description
     */
    requestHeaderFieldsTooLarge( params ) {
        this.scope.status( this.status.requestHeaderFieldsTooLarge ).json( params )
    }

    /**
     * connectionClosedWithoutResponse - description
     *
     * @param  {type} params description
     */
    connectionClosedWithoutResponse( params ) {
        this.scope.status( this.status.connectionClosedWithoutResponse ).json( params )
    }

    /**
     * unavailableForLegalReasons - description
     *
     * @param  {type} params description
     */
    unavailableForLegalReasons( params ) {
        this.scope.status( this.status.unavailableForLegalReasons ).json( params )
    }

    /**
     * clientClosedRequest - description
     *
     * @param  {type} params description
     */
    clientClosedRequest( params ) {
        this.scope.status( this.status.clientClosedRequest ).json( params )
    }

    /**
     * internalServerError - description
     *
     * @param  {type} params description
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
     * notImplemented - description
     *
     * @param  {type} params description
     */
    notImplemented( params ) {
        this.scope.status( this.status.notImplemented ).json( params )
    }

    /**
     * badGateway - description
     *
     * @param  {type} params description
     */
    badGateway( params ) {
        this.scope.status( this.status.badGateway ).json( params )
    }

    /**
     * serviceUnavailable - description
     *
     * @param  {type} params description
     */
    serviceUnavailable( params ) {
        this.scope.status( this.status.serviceUnavailable ).json( params )
    }

    /**
     * gatewayTimeout - description
     *
     * @param  {type} params description
     */
    gatewayTimeout( params ) {
        this.scope.status( this.status.gatewayTimeout ).json( params )
    }

    /**
     * httpVersionNotSupported - description
     *
     * @param  {type} params description
     */
    httpVersionNotSupported( params ) {
        this.scope.status( this.status.httpVersionNotSupported ).json( params )
    }

    /**
     * variantAlsoNegotiates - description
     *
     * @param  {type} params description
     */
    variantAlsoNegotiates( params ) {
        this.scope.status( this.status.variantAlsoNegotiates ).json( params )
    }

    /**
     * insufficientStorage - description
     *
     * @param  {type} params description
     */
    insufficientStorage( params ) {
        this.scope.status( this.status.insufficientStorage ).json( params )
    }

    /**
     * loopDetected - description
     *
     * @param  {type} params description
     */
    loopDetected( params ) {
        this.scope.status( this.status.loopDetected ).json( params )
    }

    /**
     * notExtended - description
     *
     * @param  {type} params description
     */
    notExtended( params ) {
        this.scope.status( this.status.notExtended ).json( params )
    }

    /**
     * networkAuthenticationRequired - description
     *
     * @param  {type} params description
     */
    networkAuthenticationRequired( params ) {
        this.scope.status( this.status.networkAuthenticationRequired ).json( params )
    }

    /**
     * networkConnectTimeoutError - description
     *
     * @param  {type} params description
     */
    networkConnectTimeoutError( params ) {
        this.scope.status( this.status.networkConnectTimeoutError ).json( params )
    }

    /**
     * attachment - description
     *
     * @param  {type} filePath description
     * @param  {type} options  description
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
     */
    get scope() {
        return this._scope
    }

    /**
     * set - description
     *
     * @param  {type} scope description
     */
    set scope( scope ) {
        this._scope = scope
        return this
    }

    /**
     * get - description
     */
    get request() {
        return this._request
    }
}

module.exports = Response
