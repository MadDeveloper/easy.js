const Http = require( './Http' )

/**
 * @class Request
 * @extends Http
 */
class Request extends Http {
    /**
     * constructor
     *
     * @param  {express.Request} req
     * @param  {string} appName
     */
    constructor( req, appName ) {
        super()

        this._appName = appName
        this._scope = req
        this._applicationCacheScope = 'applicationCache'

        /*
         * Defining global app scope in request
         */
        if ( !this.scope.hasOwnProperty( this._appName ) ) {
            this.scope[ this._appName ] = {}
        }

        if ( !this.scope[ this._appName ].hasOwnProperty( this._applicationCacheScope ) ) {
            this.scope[ this._appName ][ this._applicationCacheScope ] = {}
        }
    }

    /**
     * methodIs - compare current http method and mehod argument
     *
     * @param  {string} method
     * @returns {boolean}
     */
    methodIs( method ) {
        return method.toLowerCase() === this.getMethod().toLowerCase()
    }

    /**
     * getMethod - get http method
     *
     * @returns {string}
     */
    getMethod() {
        return this.scope.method
    }

    /**
     * getHeader - get specific http header
     *
     * @param  {string} header
     * @returns {Object|string}
     */
    getHeader( header ) {
        return this.scope.headers[ header ]
    }

    /**
     * getBody - get http body
     *
     * @returns {Object}
     */
    getBody() {
        return this.scope.body
    }

    /**
     * getRawbody - get raw http body
     *
     * @returns {string}
     */
    getRawbody() {
        return this.scope.rawBody
    }

    /**
     * getParams - get http GET parameters
     *
     * @returns {Object}
     */
    getParams() {
        return this.scope.params
    }

    /**
     * getBodyParameter - get specific body parameter
     *
     * @param  {string} key
     * @returns {any}
     */
    getBodyParameter( key ) {
        return this.getBody()[ key ]
    }

    /**
     * setBodyParameter - set body parameter
     *
     * @param  {string} key
     * @param  {any} value
     */
    setBodyParameter( key, value ) {
        this.getBody()[ key ] = value
    }

    /**
     * getRouteParameter - get specific http GET parameter
     *
     * @param  {string} param
     * @returns {any}
     */
    getRouteParameter( param ) {
        return this.getParams()[ param ]
    }

    /**
     * getAppParameter - get application parameter
     *
     * @param  {string} key
     * @returns {any}
     */
    getAppParameter( key ) {
        return this.getAppParameters()[ key ]
    }

    /**
     * getAppParameters - get all application parameters
     *
     * @returns {any}
     */
    getAppParameters() {
        return this.scope[ this._appName ]
    }

    /**
     * setAppParameter - set application parameter
     *
     * @param  {string} key
     * @param  {any} value
     */
    setAppParameter( key, value ) {
        this.scope[ this._appName ][ key ] = value
    }

    /**
     * getProperty - returns direct property on express request object
     *
     * @param  {string} property
     * @returns {any}
     */
    getProperty( property ) {
        return this.scope[ property ]
    }

    /**
     * getProperty - set direct property on express request object
     *
     * @param  {string} property
     * @param  {any} value
     */
    setProperty( property, value ) {
        this.scope[ property ] = value
    }

    /**
     * urlContains - check if current url contains path
     *
     * @param  {Array|string} paths
     * @returns {boolean}
     */
    urlContains( paths ) {
        let contains = false

        if ( 'string' === typeof paths ) {
            contains = -1 !== this.scope.originalUrl.indexOf( paths )
        } else if ( Array.isArray( paths ) ) {
            paths.forEach( path => {
                contains = contains || -1 !== this.scope.originalUrl.indexOf( path )
            })
        }

        return contains
    }

    /**
     * store - store property into application parameters
     *
     * @param  {string} property
     * @param  {any} value
     * @returns {Request}
     */
    store( property, value ) {
        /*
         * Defining or redefine property in app cache scope, stored in request
         */
        const applicationCache = this.getAppParameter( this._applicationCacheScope )

        applicationCache[ property ] = value
        this.setAppParameter( this._applicationCacheScope, applicationCache )

        return this
    }

    /**
     * find - find property stored with store() method
     *
     * @param  {string} property
     * @returns {any}
     */
    retrieve( property ) {
        return this.getAppParameters()[ this._applicationCacheScope ][ property ]
    }

    /**
     * getCookies - get cookies
     *
     * @returns {Object}
     */
    getCookies() {
        return this.scope.cookies
    }

    /**
     * get - get express request object
     *
     * @returns {express.Request}
     */
    get scope() {
        return this._scope
    }

    /**
     * set - set express request object
     *
     * @param  {Object} scope
     * @returns {Request}
     */
    set scope( scope ) {
        this._scope = scope
        return this
    }
}

module.exports = Request
