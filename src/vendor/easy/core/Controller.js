/**
 * @class Controller
 */
export default class Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( bundle, factory ) {
        this._bundle        = bundle
        this._container     = factory.container
        this._request       = this._container.getComponent( 'Request' )
        this._response      = this._container.getComponent( 'Response' )
        this._router        = this._container.getComponent( 'Router' ).scope
        this._bundlesPath   = this._container.kernel.path.bundles
    }

    /**
     * getRepository - get specific bundle repository (e.g. skeleton -> SkeletonRepository)
     *
     * @returns {Repository}
     */
    getRepository() {
        if ( repository.length > 0 ) {
            const repositoryClass = require( `${this.bundlePath}/${this.bundle}/entity/${this.bundle.capitalizeFirstLetter()}Repository` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

            return new repositoryClass( this.database )
        }
    }

    /**
     * getService - get service by name (alias from container)
     *
     * @param  {string} service
     * @param  {bool} clearCache = false
     * @returns {Service}
     */
    getService( service, clearCache = false ) {
        return this.container.getService( service, clearCache )
    }

    /**
     * verifyParams - verify params by type expected, can be optional
     *
     * @param  {object} required
     * @param  {object} params
     * @returns {bool}
     */
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

    /**
     * isNumber - check if object is a number
     *
     * @param  {object} number
     * @returns {bool}
     */
    isNumber( number ) {
        return typeof number === "number" || ( typeof number === 'string' && number.isNumber() )
    }

    /**
     * parsePatchParams - parse body from patch http request
     *
     * @returns {object}
     */
    parsePatchParams() {
        try {
            return JSON.parse( this.request.scope.rawBody )
        } catch ( error ) {}
    }

    /**
     * isPatchRequestWellParameterized - check if patch request are correct
     *
     * @returns {type}  description
     */
    isPatchRequestWellParameterized() {
        return this.request.scope.rawBody.length > 0
    }

    /**
     * doesRequiredElementExists - check if element exists and return it
     *
     * @param  {string} element
     * @param  {object} options
     * @returns {Promise}
     */
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

    /**
     * isDevEnv - check if we are in dev environment
     *
     * @returns {type}  description
     */
    isDevEnv() {
        return 'development' === process.env.NODE_ENV
    }

    /**
     * isProdEnv - check if we are in prod environment
     *
     * @returns {type}  description
     */
    isProdEnv() {
        return !this.isDevEnv()
    }

    get bundle() {
        return this._bundle
    }

    /**
     * get - express router
     *
     * @returns {express.Router}
     */
    get router() {
        return this._router
    }

    /**
     * get - request instance
     *
     * @returns {Request}
     */
    get request() {
        return this._request
    }

    /**
     * get - response instance
     *
     * @returns {Response}
     */
    get response() {
        return this._response
    }

    /**
     * get - container instance
     *
     * @returns {Container}
     */
    get container() {
        return this._container
    }

    /**
     * get - absolute bundle path
     *
     * @returns {string}
     */
    get bundlePath() {
        return this._bundlesPath
    }
}
