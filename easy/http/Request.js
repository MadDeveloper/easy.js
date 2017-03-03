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
 * @class Request
 * @extends Http
 */
class Request {
    /**
     * @constructor
     * @param {express.Request} req
     */
    constructor( req ) {
        this._scope = req
        this._applicationCacheScope = 'applicationCache'

        /*
         * Defining application cache in scope
         */
        if ( !( this._applicationCacheScope in this.scope ) ) {
            this.scope[ this._applicationCacheScope ] = {}
        }
    }

    /**
     * Compare current http method and mehod argument
     *
     * @param {string} method
     * @returns {boolean}
     */
    methodIs( method ) {
        return method.toLowerCase() === this.getMethod().toLowerCase()
    }

    /**
     * Get http method
     *
     * @returns {string}
     */
    getMethod() {
        return this.scope.method
    }

    /**
     * Get specific http header
     *
     * @param {string} header
     * @returns {Object|string}
     */
    getHeader( header ) {
        return this.scope.headers[ header ]
    }

    /**
     * Get http body
     *
     * @returns {Object}
     */
    getBody() {
        return this.scope.body
    }

    /**
     * Get raw http body
     *
     * @returns {string}
     */
    getRawBody() {
        return this.scope.rawBody
    }

    /**
     * Get http GET parameters
     *
     * @returns {Object}
     */
    getParams() {
        return this.scope.params
    }

    /**
     * Get specific body parameter
     *
     * @param {string} key
     * @returns {any}
     */
    getBodyParameter( key ) {
        return this.getBody()[ key ]
    }

    /**
     * Set body parameter
     *
     * @param {string} key
     * @param {any} value
     */
    setBodyParameter( key, value ) {
        this.getBody()[ key ] = value
    }

    /**
     * Get specific http GET parameter
     *
     * @param {string} param
     * @returns {any}
     */
    getRouteParameter( param ) {
        return this.getParams()[ param ]
    }

    /**
     * Returns direct property on express request object
     *
     * @param {string} property
     * @returns {any}
     */
    getProperty( property ) {
        return this.scope[ property ]
    }

    /**
     * Set direct property on express request object
     *
     * @param {string} property
     * @param {any} value
     */
    setProperty( property, value ) {
        this.scope[ property ] = value
    }

    /**
     * Check if current url contains path
     *
     * @param {Array|string} paths
     * @returns {boolean}
     */
    urlContains( paths ) {
        let contains = false

        if ( 'string' === typeof paths ) {
            contains = this.scope.originalUrl.includes( paths )
        } else if ( Array.isArray( paths ) ) {
            paths.forEach( path => contains = contains || this.scope.originalUrl.includes( path ) )
        }

        return contains
    }

    /**
     * Store property into application parameters
     *
     * @param {string} property
     * @param {any} value
     * @returns {Request}
     */
    store( property, value ) {
        /*
         * Defining or redefine property in app cache scope, stored in request
         */
        this.scope[ this._applicationCacheScope ][ property ] = value

        return this
    }

    /**
     * Find property stored with store() method
     *
     * @param {string} property
     * @returns {any}
     */
    retrieve( property ) {
        return this.scope[ this._applicationCacheScope ][ property ]
    }

    /**
     * Get all cookies
     *
     * @returns {Object}
     */
    getCookies() {
        return this.scope.cookies
    }

    /**
     * Get express request object
     *
     * @returns {express.Request}
     */
    get scope() {
        return this._scope
    }

    /**
     * Set express request object
     *
     * @param {Object} scope
     */
    set scope( scope ) {
        this._scope = scope
    }
}

module.exports = Request
