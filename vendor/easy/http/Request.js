const Http  = require( './Http' )

/**
 * @class Request
 * @extends Http
 */
class Request extends Http {
    /**
     * constructor - description
     *
     * @param  {type} req     description
     * @param  {type} appName description
     * @returns {type}         description
     */
    constructor( req, appName ) {
        super()

        this._appName               = appName
        this._scope                 = req
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
     * methodIs - description
     *
     * @param  {type} method description
     * @returns {type}        description
     */
    methodIs( method ) {
        return method.toLowerCase() === this.getMethod().toLowerCase()
    }

    /**
     * getMethod - description
     *
     * @returns {type}  description
     */
    getMethod() {
        return this.scope.method
    }

    /**
     * getHeader - description
     *
     * @param  {type} header description
     * @returns {type}        description
     */
    getHeader( header ) {
        return this.scope.headers[ header ]
    }

    /**
     * getBody - description
     *
     * @returns {type}  description
     */
    getBody() {
        return this.scope.body
    }

    /**
     * getRawbody - description
     *
     * @returns {type}  description
     */
    getRawbody() {
        return this.scope.rawBody
    }

    /**
     * getParams - description
     *
     * @returns {type}  description
     */
    getParams() {
        return this.scope.params
    }

    /**
     * getBodyParameter - description
     *
     * @param  {type} key description
     * @returns {type}     description
     */
    getBodyParameter( key ) {
        return this.getBody()[ key ]
    }

    /**
     * setBodyParameter - description
     *
     * @param  {type} key   description
     * @param  {type} value description
     * @returns {type}       description
     */
    setBodyParameter( key, value ) {
        this.getBody()[ key ] = value
    }

    /**
     * getRouteParameter - description
     *
     * @param  {type} param description
     * @returns {type}       description
     */
    getRouteParameter( param ) {
        return this.getParams()[ param ]
    }

    /**
     * getAppParameter - description
     *
     * @param  {type} key description
     * @returns {type}     description
     */
    getAppParameter( key ) {
        return this.getAppParameters()[ key ]
    }

    /**
     * getAppParameters - description
     *
     * @returns {type}  description
     */
    getAppParameters() {
        return this.scope[ this._appName ]
    }

    /**
     * setAppParameter - description
     *
     * @param  {type} key   description
     * @param  {type} value description
     * @returns {type}       description
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
     * urlContains - description
     *
     * @param  {type} paths description
     * @returns {type}       description
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
     * store - description
     *
     * @param  {type} property description
     * @param  {type} value    description
     * @returns {type}          description
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
     * find - description
     *
     * @param  {type} property description
     * @returns {type}          description
     */
    retrieve( property ) {
        return this.getAppParameters()[ this._applicationCacheScope ][ property ]
    }

    /**
     * getCookies - description
     *
     * @returns {type}  description
     */
    getCookies() {
        return this.scope.cookies
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
}

module.exports = Request
