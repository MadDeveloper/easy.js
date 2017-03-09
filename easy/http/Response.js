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
 */
class Response {
    /**
     * @constructor
     * @param {Object} res
     */
    constructor( res ) {
        this._scope = res
		this.content = undefined
    }

	/**
	 * Check if the headers are already sent
	 *
	 * @returns {boolean}
	 *
	 * @memberOf Response
	 */
	headersAlreadySent() {
		return this.scope.headersSent
	}

    /**
     * continue
     *
     * @param {any} params
     */
    continue( params ) {
        this.scope.status( Http.status.continue ).json( params || this.content )
    }

    /**
     * switchingProtocols
     *
     * @param {any} params
     */
    switchingProtocols( params ) {
        this.scope.status( Http.status.switchingProtocols ).json( params || this.content )
    }

    /**
     * processing
     *
     * @param {any} params
     */
    processing( params ) {
        this.scope.status( Http.status.processing ).json( params || this.content )
    }

    /**
     * ok
     *
     * @param {any} params
     */
    ok( params ) {
        this.scope.status( Http.status.ok ).json( params || this.content )
    }

    /**
     * created
     *
     * @param {any} params
     */
    created( params ) {
        this.scope.status( Http.status.created ).json( params || this.content )
    }

    /**
     * accepted
     *
     * @param {any} params
     */
    accepted( params ) {
        this.scope.status( Http.status.accepted ).json( params || this.content )
    }

    /**
     * nonAuthoritativeInformation
     *
     * @param {any} params
     */
    nonAuthoritativeInformation( params ) {
        this.scope.status( Http.status.nonAuthoritativeInformation ).json( params || this.content )
    }

    /**
     * noContent
     *
     * @param {any} params
     */
    noContent( params ) {
        this.scope.status( Http.status.noContent ).json( params || this.content )
    }

    /**
     * resetContent
     *
     * @param {any} params
     */
    resetContent( params ) {
        this.scope.status( Http.status.resetContent ).json( params || this.content )
    }

    /**
     * partialContent
     *
     * @param {any} params
     */
    partialContent( params ) {
        this.scope.status( Http.status.partialContent ).json( params || this.content )
    }

    /**
     * multiStatus
     *
     * @param {any} params
     */
    multiStatus( params ) {
        this.scope.status( Http.status.multiStatus ).json( params || this.content )
    }

    /**
     * alreadyReported
     *
     * @param {any} params
     */
    alreadyReported( params ) {
        this.scope.status( Http.status.alreadyReported ).json( params || this.content )
    }

    /**
     * IMUsed
     *
     * @param {any} params
     */
    IMUsed( params ) {
        this.scope.status( Http.status.IMUsed ).json( params || this.content )
    }

    /**
     * multipleChoices
     *
     * @param {any} params
     */
    multipleChoices( params ) {
        this.scope.status( Http.status.multipleChoices ).json( params || this.content )
    }

    /**
     * movedPermanently
     *
     * @param {any} params
     */
    movedPermanently( params ) {
        this.scope.status( Http.status.movedPermanently ).json( params || this.content )
    }

    /**
     * found
     *
     * @param {any} params
     */
    found( params ) {
        this.scope.status( Http.status.found ).json( params || this.content )
    }

    /**
     * seeOther
     *
     * @param {any} params
     */
    seeOther( params ) {
        this.scope.status( Http.status.seeOther ).json( params || this.content )
    }

    /**
     * notModified
     *
     * @param {any} params
     */
    notModified( params ) {
        this.scope.status( Http.status.notModified ).json( params || this.content )
    }

    /**
     * useProxy
     *
     * @param {any} params
     */
    useProxy( params ) {
        this.scope.status( Http.status.useProxy ).json( params || this.content )
    }

    /**
     * temporaryRedirect
     *
     * @param {any} params
     */
    temporaryRedirect( params ) {
        this.scope.status( Http.status.temporaryRedirect ).json( params || this.content )
    }

    /**
     * permanentRedirect
     *
     * @param {any} params
     */
    permanentRedirect( params ) {
        this.scope.status( Http.status.permanentRedirect ).json( params || this.content )
    }

    /**
     * badRequest
     *
     * @param {any} params
     */
    badRequest( params ) {
        this.scope.status( Http.status.badRequest ).json( params || this.content )
    }

    /**
     * unauthorized
     *
     * @param {any} params
     */
    unauthorized( params ) {
        this.scope.status( Http.status.unauthorized ).json( params || this.content )
    }

    /**
     * paymentRequired
     *
     * @param {any} params
     */
    paymentRequired( params ) {
        this.scope.status( Http.status.paymentRequired ).json( params || this.content )
    }

    /**
     * forbidden
     *
     * @param {any} params
     */
    forbidden( params ) {
        this.scope.status( Http.status.forbidden ).json( params || this.content )
    }

    /**
     * notFound
     *
     * @param {any} params
     */
    notFound( params ) {
        this.scope.status( Http.status.notFound ).json( params || this.content )
    }

    /**
     * methodNotAllowed
     *
     * @param {any} params
     */
    methodNotAllowed( params ) {
        this.scope.status( Http.status.methodNotAllowed ).json( params || this.content )
    }

    /**
     * notAcceptable
     *
     * @param {any} params
     */
    notAcceptable( params ) {
        this.scope.status( Http.status.notAcceptable ).json( params || this.content )
    }

    /**
     * proxyAuthenticationRequired
     *
     * @param {any} params
     */
    proxyAuthenticationRequired( params ) {
        this.scope.status( Http.status.proxyAuthenticationRequired ).json( params || this.content )
    }

    /**
     * requestTimeout
     *
     * @param {any} params
     */
    requestTimeout( params ) {
        this.scope.status( Http.status.requestTimeout ).json( params || this.content )
    }

    /**
     * conflict
     *
     * @param {any} params
     */
    conflict( params ) {
        this.scope.status( Http.status.conflict ).json( params || this.content )
    }

    /**
     * gone
     *
     * @param {any} params
     */
    gone( params ) {
        this.scope.status( Http.status.gone ).json( params || this.content )
    }

    /**
     * lengthRequired
     *
     * @param {any} params
     */
    lengthRequired( params ) {
        this.scope.status( Http.status.lengthRequired ).json( params || this.content )
    }

    /**
     * preconditionFailed
     *
     * @param {any} params
     */
    preconditionFailed( params ) {
        this.scope.status( Http.status.preconditionFailed ).json( params || this.content )
    }

    /**
     * payloadTooLarge
     *
     * @param {any} params
     */
    payloadTooLarge( params ) {
        this.scope.status( Http.status.payloadTooLarge ).json( params || this.content )
    }

    /**
     * requestURITooLong
     *
     * @param {any} params
     */
    requestURITooLong( params ) {
        this.scope.status( Http.status.requestURITooLong ).json( params || this.content )
    }

    /**
     * unsupportedMediaType
     *
     * @param {any} params
     */
    unsupportedMediaType( params ) {
        this.scope.status( Http.status.unsupportedMediaType ).json( params || this.content )
    }

    /**
     * requestedRangeNotSatisfiable
     *
     * @param {any} params
     */
    requestedRangeNotSatisfiable( params ) {
        this.scope.status( Http.status.requestedRangeNotSatisfiable ).json( params || this.content )
    }

    /**
     * expectationFailed
     *
     * @param {any} params
     */
    expectationFailed( params ) {
        this.scope.status( Http.status.expectationFailed ).json( params || this.content )
    }

    /**
     * misdirectedRequest
     *
     * @param {any} params
     */
    misdirectedRequest( params ) {
        this.scope.status( Http.status.misdirectedRequest ).json( params || this.content )
    }

    /**
     * unprocessableEntity
     *
     * @param {any} params
     */
    unprocessableEntity( params ) {
        this.scope.status( Http.status.unprocessableEntity ).json( params || this.content )
    }

    /**
     * locked
     *
     * @param {any} params
     */
    locked( params ) {
        this.scope.status( Http.status.locked ).json( params || this.content )
    }

    /**
     * failedDependency
     *
     * @param {any} params
     */
    failedDependency( params ) {
        this.scope.status( Http.status.failedDependency ).json( params || this.content )
    }

    /**
     * upgradeRequired
     *
     * @param {any} params
     */
    upgradeRequired( params ) {
        this.scope.status( Http.status.upgradeRequired ).json( params || this.content )
    }

    /**
     * preconditionRequired
     *
     * @param {any} params
     */
    preconditionRequired( params ) {
        this.scope.status( Http.status.preconditionRequired ).json( params || this.content )
    }

    /**
     * tooManyRequests
     *
     * @param {any} params
     */
    tooManyRequests( params ) {
        this.scope.status( Http.status.tooManyRequests ).json( params || this.content )
    }

    /**
     * requestHeaderFieldsTooLarge
     *
     * @param {any} params
     */
    requestHeaderFieldsTooLarge( params ) {
        this.scope.status( Http.status.requestHeaderFieldsTooLarge ).json( params || this.content )
    }

    /**
     * connectionClosedWithoutResponse
     *
     * @param {any} params
     */
    connectionClosedWithoutResponse( params ) {
        this.scope.status( Http.status.connectionClosedWithoutResponse ).json( params || this.content )
    }

    /**
     * unavailableForLegalReasons
     *
     * @param {any} params
     */
    unavailableForLegalReasons( params ) {
        this.scope.status( Http.status.unavailableForLegalReasons ).json( params || this.content )
    }

    /**
     * clientClosedRequest
     *
     * @param {any} params
     */
    clientClosedRequest( params ) {
        this.scope.status( Http.status.clientClosedRequest ).json( params || this.content )
    }

    /**
     * internalServerError
     *
     * @param {any} params
     */
    internalServerError( params ) {
        this.scope.status( Http.status.internalServerError ).json( params || this.content )
    }

    /**
     * notImplemented
     *
     * @param {any} params
     */
    notImplemented( params ) {
        this.scope.status( Http.status.notImplemented ).json( params || this.content )
    }

    /**
     * badGateway
     *
     * @param {any} params
     */
    badGateway( params ) {
        this.scope.status( Http.status.badGateway ).json( params || this.content )
    }

    /**
     * serviceUnavailable
     *
     * @param {any} params
     */
    serviceUnavailable( params ) {
        this.scope.status( Http.status.serviceUnavailable ).json( params || this.content )
    }

    /**
     * gatewayTimeout
     *
     * @param {any} params
     */
    gatewayTimeout( params ) {
        this.scope.status( Http.status.gatewayTimeout ).json( params || this.content )
    }

    /**
     * httpVersionNotSupported
     *
     * @param {any} params
     */
    httpVersionNotSupported( params ) {
        this.scope.status( Http.status.httpVersionNotSupported ).json( params || this.content )
    }

    /**
     * variantAlsoNegotiates
     *
     * @param {any} params
     */
    variantAlsoNegotiates( params ) {
        this.scope.status( Http.status.variantAlsoNegotiates ).json( params || this.content )
    }

    /**
     * insufficientStorage
     *
     * @param {any} params
     */
    insufficientStorage( params ) {
        this.scope.status( Http.status.insufficientStorage ).json( params || this.content )
    }

    /**
     * loopDetected
     *
     * @param {any} params
     */
    loopDetected( params ) {
        this.scope.status( Http.status.loopDetected ).json( params || this.content )
    }

    /**
     * notExtended
     *
     * @param {any} params
     */
    notExtended( params ) {
        this.scope.status( Http.status.notExtended ).json( params || this.content )
    }

    /**
     * networkAuthenticationRequired
     *
     * @param {any} params
     */
    networkAuthenticationRequired( params ) {
        this.scope.status( Http.status.networkAuthenticationRequired ).json( params || this.content )
    }

    /**
     * networkConnectTimeoutError
     *
     * @param {any} params
     */
    networkConnectTimeoutError( params ) {
        this.scope.status( Http.status.networkConnectTimeoutError ).json( params || this.content )
    }

    /**
     * Send attachment in the response
     *
     * @param {string} filePath
     * @param {Object} options
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
	 * Set response headers
	 *
	 * @param {Object} [headers={}]
	 *
	 * @memberOf Response
	 */
	setHeaders( headers = {}) {
		Reflect.ownKeys( headers ).forEach( header => this.setHeader( header, headers[ header ]) )
	}

	/**
	 * Set response header
	 *
	 * @param {string} [header='']
	 * @param {string} [value='']
	 *
	 * @memberOf Response
	 */
	setHeader( header = '', value = '' ) {
		if ( !header.isEmpty() && !value.isEmpty() ) {
			this.scope.set( header, value )
		}
	}

	/**
	 * Add response content
	 *
	 * @param {any} content
	 * @returns Response
	 *
	 * @memberOf Response
	 */
	addContent( content ) {
		this.content += content

		return this
	}

	/**
	 * Set response content
	 *
	 * @param {any} content
	 * @returns Response
	 *
	 * @memberOf Response
	 */
	setContent( content ) {
		this.content = content

		return this
	}

    /**
     * Get response scope
     *
     * @returns {Object}
     */
    get scope() {
        return this._scope
    }

    /**
     * Set response scope
     *
     * @param {Object} scope
     */
    set scope( scope ) {
        this._scope = scope
    }
}

module.exports = Response
