export default class Controller {
    constructor( container ) {
        this._container = container
        this._http = this._container.getComponent( 'Http' )
    }

    verifyParams( required, params ) {
        let verified = true

        for ( var requiredParam in required ) {
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

    isPatchRequestWellParameterized( req ) {
        return req.rawBody.length > 0
    }

    doesRequiredElementExists( element, options, BundleManager, callback ) {
        let requireBy = null
        let optionsFetch = null

        if ( options instanceof Object && !( options instanceof Array ) ) {
            requireBy = options.requireBy
            optionsFetch = options.options
        } else {
            requireBy = options
        }

        const ElementRepository = BundleManager.getFactory( element.capitalizeFirstLetter() ).getRepository()

        ElementRepository.read( requireBy, optionsFetch )
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

    get http() {
        return this._http
    }
}
