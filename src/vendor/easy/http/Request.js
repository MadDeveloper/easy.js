import Http from './Http'

export default class Request extends Http {
    constructor( req, appName ) {
        super()

        this._appName   = appName
        this._scope     = req

        /*
         * Defining global app scope in request
         */
        if ( !this.scope.hasOwnProperty( this.appName ) ) {
            this.scope[ this.appName ] = {}
        }
    }

    methodIs( method ) {
        return method.toLowerCase() === this.getMethod().toLowerCase()
    }

    getMethod() {
        return this.scope.method
    }

    getBody() {
        return this.scope.body
    }

    getRawbody() {
        return this.scope.rawBody
    }

    getParams() {
        return this.scope.params
    }

    getBodyParameter( key ) {
        return this.getBody()[ key ]
    }

    setBodyParameter( key, value ) {
        this.getBody()[ key ] = value
    }

    getRouteParameter( param ) {
        return this.getParams()[ param ]
    }

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

    define( property, value ) {
        /*
         * Defining or redefine property in app scope in request
         */
        this.scope[ this.appName ][ property ] = value

        return this
    }

    find( property ) {
        if ( this.scope[ this.appName ].hasOwnProperty( property ) ) {
            return this.scope[ this.appName ][ property ]
        } else {
            return undefined
        }
    }

    /*
     * Getters and setters
     */
    get appName() {
        return this._appName
    }

    get scope() {
        return this._scope
    }

    set scope( scope ) {
        this._scope = scope
        return this
    }
}
