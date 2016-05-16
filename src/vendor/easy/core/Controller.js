export default class Controller {
    constructor( container ) {
        this._container = container
        this._router    = this._container.router
        this._database  = this._container.database
        this._http      = this._container.getComponent( 'Http' )
        this._request   = this._container.getComponent( 'Request' )
        this._response  = this._container.getComponent( 'Response' )
    }

    verifyParams( required, params ) {
        let verified = true

        for ( let requiredParam in required ) {
            const optional = required[ requiredParam ].optional

            if ( !params.hasOwnProperty( required[ requiredParam ].property ) ) {
                if ( !optional ) {
                    verified = false
                    break
                }
            } else if ( typeof params[ required[ requiredParam ].property ] !== required[ requiredParam ].typeExpected ) {
                if ( required[ requiredParam ].typeExpected === 'number' ) {
                    if ( !params[ required[ requiredParam ].property ].isNumber() ) {
                        verified = false
                        break
                    }
                } else {
                    verified = false
                    break
                }
            }
        }

        return verified
    }

    isNumber( number ) {
        return typeof number === "number" || ( typeof number === 'string' && number.isNumber() )
    }

    parsePatchParams( req ) {
        try {
            return JSON.parse( req.rawBody )
        } catch ( error ) {}
    }

    isPatchRequestWellParameterized( request ) {
        return request.scope.rawBody.length > 0
    }

    doesRequiredElementExists( element, options, bundleManager, callback ) {
        let requireBy = null
        let optionsFetch = null

        if ( options instanceof Object && !( options instanceof Array ) ) {
            requireBy = options.requireBy
            optionsFetch = options.options
        } else {
            requireBy = options
        }

        const elementRepository = bundleManager.getFactory( element.capitalizeFirstLetter() ).getRepository()

        elementRepository.read( requireBy, optionsFetch )
        .then( element => {

            if ( element ) {

                callback( element )

            } else {
                this.http.notFound()
            }

        })
        .catch( error => {
            this.http.internalServerError( error )
        })
    }

    isDevEnv() {
        return 'development' === process.env.NODE_ENV
    }

    isProdEnv() {
        return !this.isDevEnv()
    }

    /*
     * Getters and setters
     */
    get container() {
        return this._container
    }

    get router() {
        return this._router
    }

    get database() {
        return this._database
    }

    get http() {
        return this._http
    }

    get request() {
        return this._request
    }

    get response() {
        return this._response
    }
}
