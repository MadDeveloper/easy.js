const Http = require( './Http' )

/**
 * @class Response
 * @extends Http
 */
class Response extends Http {
    /**
     * constructor
     *
     * @param  {express.Response} res
     * @param  {Request} request
     * @param  {Logger} logger
     */
    constructor( res, request, logger ) {
        super()

        this._scope = res
        this._logger = logger
        this._request = request
    }

    /**
     * formatParams - format params which are sent with the response
     *
     * @param  {any} params
     * @param  {any} setDefault
     * @returns {Object}
     */
    formatParams( params, setDefault ) {
        if ( "undefined" === typeof params ) {
            if ( typeof setDefault !== "undefined" ) {
                params = setDefault
            }
        }

        return params
    }

    /**
     * continue
     *
     * @param  {any} params
     */
    continue( params ) {
        this.scope.status( this.status.continue ).json( params )
    }

    /**
     * switchingProtocols
     *
     * @param  {any} params
     */
    switchingProtocols( params ) {
        this.scope.status( this.status.switchingProtocols ).json( params )
    }

    /**
     * processing
     *
     * @param  {any} params
     */
    processing( params ) {
        this.scope.status( this.status.processing ).json( params )
    }

    /**
     * ok
     *
     * @param  {any} params
     */
    ok( params ) {
        this.scope.status( this.status.ok ).json( params )
    }

    /**
     * created
     *
     * @param  {any} params
     */
    created( params ) {
        this.scope.status( this.status.created ).json( params )
    }

    /**
     * accepted
     *
     * @param  {any} params
     */
    accepted( params ) {
        this.scope.status( this.status.accepted ).json( params )
    }

    /**
     * nonAuthoritativeInformation
     *
     * @param  {any} params
     */
    nonAuthoritativeInformation( params ) {
        this.scope.status( this.status.nonAuthoritativeInformation ).json( params )
    }

    /**
     * noContent
     *
     * @param  {any} params
     */
    noContent( params ) {
        this.scope.status( this.status.noContent ).json( params )
    }

    /**
     * resetContent
     *
     * @param  {any} params
     */
    resetContent( params ) {
        this.scope.status( this.status.resetContent ).json( params )
    }

    /**
     * partialContent
     *
     * @param  {any} params
     */
    partialContent( params ) {
        this.scope.status( this.status.partialContent ).json( params )
    }

    /**
     * multiStatus
     *
     * @param  {any} params
     */
    multiStatus( params ) {
        this.scope.status( this.status.multiStatus ).json( params )
    }

    /**
     * alreadyReported
     *
     * @param  {any} params
     */
    alreadyReported( params ) {
        this.scope.status( this.status.alreadyReported ).json( params )
    }

    /**
     * IMUsed
     *
     * @param  {any} params
     */
    IMUsed( params ) {
        this.scope.status( this.status.IMUsed ).json( params )
    }

    /**
     * multipleChoices
     *
     * @param  {any} params
     */
    multipleChoices( params ) {
        this.scope.status( this.status.multipleChoices ).json( params )
    }

    /**
     * movedPermanently
     *
     * @param  {any} params
     */
    movedPermanently( params ) {
        this.scope.status( this.status.movedPermanently ).json( params )
    }

    /**
     * found
     *
     * @param  {any} params
     */
    found( params ) {
        this.scope.status( this.status.found ).json( params )
    }

    /**
     * seeOther
     *
     * @param  {any} params
     */
    seeOther( params ) {
        this.scope.status( this.status.seeOther ).json( params )
    }

    /**
     * notModified
     *
     * @param  {any} params
     */
    notModified( params ) {
        this.scope.status( this.status.notModified ).json( params )
    }

    /**
     * useProxy
     *
     * @param  {any} params
     */
    useProxy( params ) {
        this.scope.status( this.status.useProxy ).json( params )
    }

    /**
     * temporaryRedirect
     *
     * @param  {any} params
     */
    temporaryRedirect( params ) {
        this.scope.status( this.status.temporaryRedirect ).json( params )
    }

    /**
     * permanentRedirect
     *
     * @param  {any} params
     */
    permanentRedirect( params ) {
        this.scope.status( this.status.permanentRedirect ).json( params )
    }

    /**
     * badRequest
     *
     * @param  {any} params
     */
    badRequest( params ) {
        this.scope.status( this.status.badRequest ).json( params )
    }

    /**
     * unauthorized
     *
     * @param  {any} params
     */
    unauthorized( params ) {
        this.scope.status( this.status.unauthorized ).json( params )
    }

    /**
     * paymentRequired
     *
     * @param  {any} params
     */
    paymentRequired( params ) {
        this.scope.status( this.status.paymentRequired ).json( params )
    }

    /**
     * forbidden
     *
     * @param  {any} params
     */
    forbidden( params ) {
        this.scope.status( this.status.forbidden ).json( params )
    }

    /**
     * notFound
     *
     * @param  {any} params
     */
    notFound( params ) {
        this.scope.status( this.status.notFound ).json( params )
    }

    /**
     * methodNotAllowed
     *
     * @param  {any} params
     */
    methodNotAllowed( params ) {
        this.scope.status( this.status.methodNotAllowed ).json( params )
    }

    /**
     * notAcceptable
     *
     * @param  {any} params
     */
    notAcceptable( params ) {
        this.scope.status( this.status.notAcceptable ).json( params )
    }

    /**
     * proxyAuthenticationRequired
     *
     * @param  {any} params
     */
    proxyAuthenticationRequired( params ) {
        this.scope.status( this.status.proxyAuthenticationRequired ).json( params )
    }

    /**
     * requestTimeout
     *
     * @param  {any} params
     */
    requestTimeout( params ) {
        this.scope.status( this.status.requestTimeout ).json( params )
    }

    /**
     * conflict
     *
     * @param  {any} params
     */
    conflict( params ) {
        this.scope.status( this.status.conflict ).json( params )
    }

    /**
     * gone
     *
     * @param  {any} params
     */
    gone( params ) {
        this.scope.status( this.status.gone ).json( params )
    }

    /**
     * lengthRequired
     *
     * @param  {any} params
     */
    lengthRequired( params ) {
        this.scope.status( this.status.lengthRequired ).json( params )
    }

    /**
     * preconditionFailed
     *
     * @param  {any} params
     */
    preconditionFailed( params ) {
        this.scope.status( this.status.preconditionFailed ).json( params )
    }

    /**
     * payloadTooLarge
     *
     * @param  {any} params
     */
    payloadTooLarge( params ) {
        this.scope.status( this.status.payloadTooLarge ).json( params )
    }

    /**
     * requestURITooLong
     *
     * @param  {any} params
     */
    requestURITooLong( params ) {
        this.scope.status( this.status.requestURITooLong ).json( params )
    }

    /**
     * unsupportedMediaType
     *
     * @param  {any} params
     */
    unsupportedMediaType( params ) {
        this.scope.status( this.status.unsupportedMediaType ).json( params )
    }

    /**
     * requestedRangeNotSatisfiable
     *
     * @param  {any} params
     */
    requestedRangeNotSatisfiable( params ) {
        this.scope.status( this.status.requestedRangeNotSatisfiable ).json( params )
    }

    /**
     * expectationFailed
     *
     * @param  {any} params
     */
    expectationFailed( params ) {
        this.scope.status( this.status.expectationFailed ).json( params )
    }

    /**
     * misdirectedRequest
     *
     * @param  {any} params
     */
    misdirectedRequest( params ) {
        this.scope.status( this.status.misdirectedRequest ).json( params )
    }

    /**
     * unprocessableEntity
     *
     * @param  {any} params
     */
    unprocessableEntity( params ) {
        this.scope.status( this.status.unprocessableEntity ).json( params )
    }

    /**
     * locked
     *
     * @param  {any} params
     */
    locked( params ) {
        this.scope.status( this.status.locked ).json( params )
    }

    /**
     * failedDependency
     *
     * @param  {any} params
     */
    failedDependency( params ) {
        this.scope.status( this.status.failedDependency ).json( params )
    }

    /**
     * upgradeRequired
     *
     * @param  {any} params
     */
    upgradeRequired( params ) {
        this.scope.status( this.status.upgradeRequired ).json( params )
    }

    /**
     * preconditionRequired
     *
     * @param  {any} params
     */
    preconditionRequired( params ) {
        this.scope.status( this.status.preconditionRequired ).json( params )
    }

    /**
     * tooManyRequests
     *
     * @param  {any} params
     */
    tooManyRequests( params ) {
        this.scope.status( this.status.tooManyRequests ).json( params )
    }

    /**
     * requestHeaderFieldsTooLarge
     *
     * @param  {any} params
     */
    requestHeaderFieldsTooLarge( params ) {
        this.scope.status( this.status.requestHeaderFieldsTooLarge ).json( params )
    }

    /**
     * connectionClosedWithoutResponse
     *
     * @param  {any} params
     */
    connectionClosedWithoutResponse( params ) {
        this.scope.status( this.status.connectionClosedWithoutResponse ).json( params )
    }

    /**
     * unavailableForLegalReasons
     *
     * @param  {any} params
     */
    unavailableForLegalReasons( params ) {
        this.scope.status( this.status.unavailableForLegalReasons ).json( params )
    }

    /**
     * clientClosedRequest
     *
     * @param  {any} params
     */
    clientClosedRequest( params ) {
        this.scope.status( this.status.clientClosedRequest ).json( params )
    }

    /**
     * internalServerError
     *
     * @param  {any} params
     */
    internalServerError( params ) {
        const req = this.request.scope
        const alertLog = `[{currentDate}] -- {remoteHostIp} -- {method} {originalUrl} {statusCode} -- ${params}\n`

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
     * notImplemented
     *
     * @param  {any} params
     */
    notImplemented( params ) {
        this.scope.status( this.status.notImplemented ).json( params )
    }

    /**
     * badGateway
     *
     * @param  {any} params
     */
    badGateway( params ) {
        this.scope.status( this.status.badGateway ).json( params )
    }

    /**
     * serviceUnavailable
     *
     * @param  {any} params
     */
    serviceUnavailable( params ) {
        this.scope.status( this.status.serviceUnavailable ).json( params )
    }

    /**
     * gatewayTimeout
     *
     * @param  {any} params
     */
    gatewayTimeout( params ) {
        this.scope.status( this.status.gatewayTimeout ).json( params )
    }

    /**
     * httpVersionNotSupported
     *
     * @param  {any} params
     */
    httpVersionNotSupported( params ) {
        this.scope.status( this.status.httpVersionNotSupported ).json( params )
    }

    /**
     * variantAlsoNegotiates
     *
     * @param  {any} params
     */
    variantAlsoNegotiates( params ) {
        this.scope.status( this.status.variantAlsoNegotiates ).json( params )
    }

    /**
     * insufficientStorage
     *
     * @param  {any} params
     */
    insufficientStorage( params ) {
        this.scope.status( this.status.insufficientStorage ).json( params )
    }

    /**
     * loopDetected
     *
     * @param  {any} params
     */
    loopDetected( params ) {
        this.scope.status( this.status.loopDetected ).json( params )
    }

    /**
     * notExtended
     *
     * @param  {any} params
     */
    notExtended( params ) {
        this.scope.status( this.status.notExtended ).json( params )
    }

    /**
     * networkAuthenticationRequired
     *
     * @param  {any} params
     */
    networkAuthenticationRequired( params ) {
        this.scope.status( this.status.networkAuthenticationRequired ).json( params )
    }

    /**
     * networkConnectTimeoutError
     *
     * @param  {any} params
     */
    networkConnectTimeoutError( params ) {
        this.scope.status( this.status.networkConnectTimeoutError ).json( params )
    }

    /**
     * attachment - send media response
     *
     * @param  {string} filePath
     * @param  {Object} options
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
     * get - get express Response object
     */
    get scope() {
        return this._scope
    }

    /**
     * set - set express Response object
     *
     * @param  {Object@} scope
     */
    set scope( scope ) {
        this._scope = scope
        return this
    }

    /**
     * get - get easy.js Request instance
     */
    get request() {
        return this._request
    }
}

module.exports = Response
