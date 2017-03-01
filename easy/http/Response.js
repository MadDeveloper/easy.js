/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Http = require( './Http' )

/**
 * @class Response
 * @extends Http
 */
class Response {
    /**
     * constructor
     *
     * @param  {express.Response} res
     */
    constructor( res ) {
        this._scope = res
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
        this.scope.status( Http.status.continue ).json( params )
    }

    /**
     * switchingProtocols
     *
     * @param  {any} params
     */
    switchingProtocols( params ) {
        this.scope.status( Http.status.switchingProtocols ).json( params )
    }

    /**
     * processing
     *
     * @param  {any} params
     */
    processing( params ) {
        this.scope.status( Http.status.processing ).json( params )
    }

    /**
     * ok
     *
     * @param  {any} params
     */
    ok( params ) {
        this.scope.status( Http.status.ok ).json( params )
    }

    /**
     * created
     *
     * @param  {any} params
     */
    created( params ) {
        this.scope.status( Http.status.created ).json( params )
    }

    /**
     * accepted
     *
     * @param  {any} params
     */
    accepted( params ) {
        this.scope.status( Http.status.accepted ).json( params )
    }

    /**
     * nonAuthoritativeInformation
     *
     * @param  {any} params
     */
    nonAuthoritativeInformation( params ) {
        this.scope.status( Http.status.nonAuthoritativeInformation ).json( params )
    }

    /**
     * noContent
     *
     * @param  {any} params
     */
    noContent( params ) {
        this.scope.status( Http.status.noContent ).json( params )
    }

    /**
     * resetContent
     *
     * @param  {any} params
     */
    resetContent( params ) {
        this.scope.status( Http.status.resetContent ).json( params )
    }

    /**
     * partialContent
     *
     * @param  {any} params
     */
    partialContent( params ) {
        this.scope.status( Http.status.partialContent ).json( params )
    }

    /**
     * multiStatus
     *
     * @param  {any} params
     */
    multiStatus( params ) {
        this.scope.status( Http.status.multiStatus ).json( params )
    }

    /**
     * alreadyReported
     *
     * @param  {any} params
     */
    alreadyReported( params ) {
        this.scope.status( Http.status.alreadyReported ).json( params )
    }

    /**
     * IMUsed
     *
     * @param  {any} params
     */
    IMUsed( params ) {
        this.scope.status( Http.status.IMUsed ).json( params )
    }

    /**
     * multipleChoices
     *
     * @param  {any} params
     */
    multipleChoices( params ) {
        this.scope.status( Http.status.multipleChoices ).json( params )
    }

    /**
     * movedPermanently
     *
     * @param  {any} params
     */
    movedPermanently( params ) {
        this.scope.status( Http.status.movedPermanently ).json( params )
    }

    /**
     * found
     *
     * @param  {any} params
     */
    found( params ) {
        this.scope.status( Http.status.found ).json( params )
    }

    /**
     * seeOther
     *
     * @param  {any} params
     */
    seeOther( params ) {
        this.scope.status( Http.status.seeOther ).json( params )
    }

    /**
     * notModified
     *
     * @param  {any} params
     */
    notModified( params ) {
        this.scope.status( Http.status.notModified ).json( params )
    }

    /**
     * useProxy
     *
     * @param  {any} params
     */
    useProxy( params ) {
        this.scope.status( Http.status.useProxy ).json( params )
    }

    /**
     * temporaryRedirect
     *
     * @param  {any} params
     */
    temporaryRedirect( params ) {
        this.scope.status( Http.status.temporaryRedirect ).json( params )
    }

    /**
     * permanentRedirect
     *
     * @param  {any} params
     */
    permanentRedirect( params ) {
        this.scope.status( Http.status.permanentRedirect ).json( params )
    }

    /**
     * badRequest
     *
     * @param  {any} params
     */
    badRequest( params ) {
        this.scope.status( Http.status.badRequest ).json( params )
    }

    /**
     * unauthorized
     *
     * @param  {any} params
     */
    unauthorized( params ) {
        this.scope.status( Http.status.unauthorized ).json( params )
    }

    /**
     * paymentRequired
     *
     * @param  {any} params
     */
    paymentRequired( params ) {
        this.scope.status( Http.status.paymentRequired ).json( params )
    }

    /**
     * forbidden
     *
     * @param  {any} params
     */
    forbidden( params ) {
        this.scope.status( Http.status.forbidden ).json( params )
    }

    /**
     * notFound
     *
     * @param  {any} params
     */
    notFound( params ) {
        this.scope.status( Http.status.notFound ).json( params )
    }

    /**
     * methodNotAllowed
     *
     * @param  {any} params
     */
    methodNotAllowed( params ) {
        this.scope.status( Http.status.methodNotAllowed ).json( params )
    }

    /**
     * notAcceptable
     *
     * @param  {any} params
     */
    notAcceptable( params ) {
        this.scope.status( Http.status.notAcceptable ).json( params )
    }

    /**
     * proxyAuthenticationRequired
     *
     * @param  {any} params
     */
    proxyAuthenticationRequired( params ) {
        this.scope.status( Http.status.proxyAuthenticationRequired ).json( params )
    }

    /**
     * requestTimeout
     *
     * @param  {any} params
     */
    requestTimeout( params ) {
        this.scope.status( Http.status.requestTimeout ).json( params )
    }

    /**
     * conflict
     *
     * @param  {any} params
     */
    conflict( params ) {
        this.scope.status( Http.status.conflict ).json( params )
    }

    /**
     * gone
     *
     * @param  {any} params
     */
    gone( params ) {
        this.scope.status( Http.status.gone ).json( params )
    }

    /**
     * lengthRequired
     *
     * @param  {any} params
     */
    lengthRequired( params ) {
        this.scope.status( Http.status.lengthRequired ).json( params )
    }

    /**
     * preconditionFailed
     *
     * @param  {any} params
     */
    preconditionFailed( params ) {
        this.scope.status( Http.status.preconditionFailed ).json( params )
    }

    /**
     * payloadTooLarge
     *
     * @param  {any} params
     */
    payloadTooLarge( params ) {
        this.scope.status( Http.status.payloadTooLarge ).json( params )
    }

    /**
     * requestURITooLong
     *
     * @param  {any} params
     */
    requestURITooLong( params ) {
        this.scope.status( Http.status.requestURITooLong ).json( params )
    }

    /**
     * unsupportedMediaType
     *
     * @param  {any} params
     */
    unsupportedMediaType( params ) {
        this.scope.status( Http.status.unsupportedMediaType ).json( params )
    }

    /**
     * requestedRangeNotSatisfiable
     *
     * @param  {any} params
     */
    requestedRangeNotSatisfiable( params ) {
        this.scope.status( Http.status.requestedRangeNotSatisfiable ).json( params )
    }

    /**
     * expectationFailed
     *
     * @param  {any} params
     */
    expectationFailed( params ) {
        this.scope.status( Http.status.expectationFailed ).json( params )
    }

    /**
     * misdirectedRequest
     *
     * @param  {any} params
     */
    misdirectedRequest( params ) {
        this.scope.status( Http.status.misdirectedRequest ).json( params )
    }

    /**
     * unprocessableEntity
     *
     * @param  {any} params
     */
    unprocessableEntity( params ) {
        this.scope.status( Http.status.unprocessableEntity ).json( params )
    }

    /**
     * locked
     *
     * @param  {any} params
     */
    locked( params ) {
        this.scope.status( Http.status.locked ).json( params )
    }

    /**
     * failedDependency
     *
     * @param  {any} params
     */
    failedDependency( params ) {
        this.scope.status( Http.status.failedDependency ).json( params )
    }

    /**
     * upgradeRequired
     *
     * @param  {any} params
     */
    upgradeRequired( params ) {
        this.scope.status( Http.status.upgradeRequired ).json( params )
    }

    /**
     * preconditionRequired
     *
     * @param  {any} params
     */
    preconditionRequired( params ) {
        this.scope.status( Http.status.preconditionRequired ).json( params )
    }

    /**
     * tooManyRequests
     *
     * @param  {any} params
     */
    tooManyRequests( params ) {
        this.scope.status( Http.status.tooManyRequests ).json( params )
    }

    /**
     * requestHeaderFieldsTooLarge
     *
     * @param  {any} params
     */
    requestHeaderFieldsTooLarge( params ) {
        this.scope.status( Http.status.requestHeaderFieldsTooLarge ).json( params )
    }

    /**
     * connectionClosedWithoutResponse
     *
     * @param  {any} params
     */
    connectionClosedWithoutResponse( params ) {
        this.scope.status( Http.status.connectionClosedWithoutResponse ).json( params )
    }

    /**
     * unavailableForLegalReasons
     *
     * @param  {any} params
     */
    unavailableForLegalReasons( params ) {
        this.scope.status( Http.status.unavailableForLegalReasons ).json( params )
    }

    /**
     * clientClosedRequest
     *
     * @param  {any} params
     */
    clientClosedRequest( params ) {
        this.scope.status( Http.status.clientClosedRequest ).json( params )
    }

    /**
     * internalServerError
     *
     * @param  {any} params
     */
    internalServerError( params ) {
        this.scope.status( Http.status.internalServerError ).json( params )
    }

    /**
     * notImplemented
     *
     * @param  {any} params
     */
    notImplemented( params ) {
        this.scope.status( Http.status.notImplemented ).json( params )
    }

    /**
     * badGateway
     *
     * @param  {any} params
     */
    badGateway( params ) {
        this.scope.status( Http.status.badGateway ).json( params )
    }

    /**
     * serviceUnavailable
     *
     * @param  {any} params
     */
    serviceUnavailable( params ) {
        this.scope.status( Http.status.serviceUnavailable ).json( params )
    }

    /**
     * gatewayTimeout
     *
     * @param  {any} params
     */
    gatewayTimeout( params ) {
        this.scope.status( Http.status.gatewayTimeout ).json( params )
    }

    /**
     * httpVersionNotSupported
     *
     * @param  {any} params
     */
    httpVersionNotSupported( params ) {
        this.scope.status( Http.status.httpVersionNotSupported ).json( params )
    }

    /**
     * variantAlsoNegotiates
     *
     * @param  {any} params
     */
    variantAlsoNegotiates( params ) {
        this.scope.status( Http.status.variantAlsoNegotiates ).json( params )
    }

    /**
     * insufficientStorage
     *
     * @param  {any} params
     */
    insufficientStorage( params ) {
        this.scope.status( Http.status.insufficientStorage ).json( params )
    }

    /**
     * loopDetected
     *
     * @param  {any} params
     */
    loopDetected( params ) {
        this.scope.status( Http.status.loopDetected ).json( params )
    }

    /**
     * notExtended
     *
     * @param  {any} params
     */
    notExtended( params ) {
        this.scope.status( Http.status.notExtended ).json( params )
    }

    /**
     * networkAuthenticationRequired
     *
     * @param  {any} params
     */
    networkAuthenticationRequired( params ) {
        this.scope.status( Http.status.networkAuthenticationRequired ).json( params )
    }

    /**
     * networkConnectTimeoutError
     *
     * @param  {any} params
     */
    networkConnectTimeoutError( params ) {
        this.scope.status( Http.status.networkConnectTimeoutError ).json( params )
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
}

module.exports = Response
