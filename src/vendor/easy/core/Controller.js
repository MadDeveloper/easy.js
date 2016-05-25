export default class Controller {
    constructor( container ) {
        this._database      = container.getComponent( 'Database')
        this._request       = container.getComponent( 'Request' )
        this._response      = container.getComponent( 'Response' )
        this._bundleManager = container.getComponent( 'BundleManager' )
        this._router        = this._bundleManager.router
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

    parsePatchParams() {
        try {
            return JSON.parse( this.request.scope.rawBody )
        } catch ( error ) {}
    }

    isPatchRequestWellParameterized() {
        return this.request.scope.rawBody.length > 0
    }

    doesRequiredElementExists( element, options ) {
        return new Promise( ( resolve, reject ) => {
            let requireBy = null
            let optionsFetch = null

            if ( options instanceof Object && !( options instanceof Array ) ) {
                requireBy = options.requireBy
                optionsFetch = options.options
            } else {
                requireBy = options
            }

            const elementRepository = this.bundleManager.getFactory( element ).getRepository()

            elementRepository.read( requireBy, optionsFetch )
            .then( element => {

                if ( element ) {

                    resolve( element )

                } else {
                    this.response.notFound()
                    reject( "Element not found" )
                }

            })
            .catch( error => {
                this.response.internalServerError( error )
                reject( error )
            })
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
    get bundleManager() {
        return this._bundleManager
    }

    get router() {
        return this._router
    }

    get database() {
        return this._database
    }

    get request() {
        return this._request
    }

    get response() {
        return this._response
    }

    get container() {
        return this.bundleManager.container
    }
}
