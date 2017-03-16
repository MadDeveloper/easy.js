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
        this._bindDescriptiveMethods()
    }

    /**
     * Bind descriptive http methods
     *
     * @private
     *
     * @memberOf Response
     */
    _bindDescriptiveMethods() {
        Reflect.ownKeys( Http.status ).forEach( method => {
            this[ method ] = content => this.scope.status( Http.status[ method ]).json( content || this.content )
        })
    }

	/**
	 * Set response content type
	 *
	 * @param {string} type
	 * @return {Response}
	 *
	 * @memberOf Response
	 */
	setContentType( type ) {
		this.scope.type( type )

		return this
	}

	/**
	 * Set response headers
	 *
	 * @param {Object} [headers={}]
	 * @returns {Response}
	 *
	 * @memberOf Response
	 */
	setHeaders( headers = {}) {
		Reflect.ownKeys( headers ).forEach( header => this.setHeader( header, headers[ header ]) )

		return this
	}

	/**
	 * Set response header
	 *
	 * @param {string} [header='']
	 * @param {string} [value='']
	 * @returns {Response}
	 *
	 * @memberOf Response
	 */
	setHeader( header = '', value = '' ) {
		if ( !header.length > 0 && !value.length > 0 ) {
			this.scope.set( header, value )
		}

		return this
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
