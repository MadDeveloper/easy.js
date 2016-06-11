import Request  from './../http/Request'
import Response from './../http/Response'

/**
 * @class Controller
 */
export default class Controller {
    /**
     * @constructor
     * @param  {express.Request} request
     * @param  {express.Response} response
     * @param  {Factory} factory
     */
    constructor( req, res, factory ) {
        this._factory       = factory
        this._container     = factory.container
        this._request       = new Request( req, this._container.kernel.appName )
        this._response      = new Response( res, this._request, this._container.getComponent( 'Logger' ) )
        this._router        = this._container.getComponent( 'Router' ).scope
        this._entityManager = this._container.getComponent( 'EntityManager' )
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
     * @param  {object} params = {}
     * @returns {bool}
     */
    verifyParams( required, params = {} ) {
        let verified = true

        if ( !params || {} == params ) {
            params = this.request.getBody()
        }

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
            return JSON.parse( this.request.getRawbody() )
        } catch ( error ) {}
    }

    /**
     * isPatchRequestWellParameterized - check if patch request are correct
     *
     * @returns {type}  description
     */
    isPatchRequestWellParameterized() {
        return this.request.getRawbody().length > 0
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

            const elementRepository = this.entityManager.getRepository( element )

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

    /**
     * get - factory instance
     *
     * @returns {Factory}
     */
    get factory() {
        return this._factory
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
     * set - define request scope
     *
     * @param  {express.Request} request
     * @returns {Controller}
     */
    set request( request ) {
        this._request = request
        return this
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
     * set - define response scope
     *
     * @param  {express.Response} response
     * @returns {Controller}
     */
    set response( response ) {
        this._response = response
        return this
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
     * get - entity manager instance
     *
     * @returns {EntityManager}
     */
    get entityManager() {
        return this._entityManager
    }
}
