export default class Request( appName ) {
    constructor( appName ) {
        this._appName = appName
        this._scope = null
    }

    getMethod() {
        return this.scope.method
    }

    getBody() {
        return this.scope.body
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

    define( property, value ) {
        /*
         * Defining global app scope in request
         */
        if ( !this.scope.hasOwnProperty( this.appName ) ) {
            this.scope[ this.appName ] = {}
        }

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
