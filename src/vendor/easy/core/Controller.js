import Request      from './../http/Request'
import Response     from './../http/Response'
import ConfigLoader from './ConfigLoader'

/**
 * @class Controller
 */
export default class Controller {
    /**
     * @constructor
     * @param  {express.Request} request
     * @param  {express.Response} response
     */
    constructor( req, res ) {
        this._container     = global.easy.container
        this._request       = new Request( req, this.container.kernel.appName )
        this._response      = new Response( res, this.request, this.container.getComponent( 'Logger' ) )
        this._entityManager = this._container.getComponent( 'EntityManager' )
        this._access        = this.getService( 'security.access' )
    }

    /**
     * getService - get service by name (alias from container)
     *
     * @param  {string} service
     * @param  {boolean} clearCache = false
     * @returns {Service}
     */
    getService( service, clearCache = false ) {
        return this.container.getService( service, clearCache )
    }

    /**
     * authorize - determine is current user can access to bundle routes
     *
     * @param  {Object} { restrictions = {}
     * @param  {string} focus = 'role_id'
     * @param  {Function} next }
     */
    authorize({ restrictions = {}, focus = 'role_id', next }) {
        if ( this.isProdEnv() ) {
            const token = this.request.getBodyParameter( 'token' )

            this.access.restrict( restrictions )

            if ( this.access.focusOn( token[ focus ] ).canReach( this.request.getMethod() ) ) {
                next()
            } else {
                this.response.forbidden()
            }
        } else {
            next()
        }
    }

    /**
     * verifyParams - verify params by type expected, can be optional
     *
     * @param  {object} required
     * @param  {object} params = {}
     * @returns {boolean}
     */
    verifyParams( required, params = {} ) {
        let verified = true

        if ( !params || JSON.stringify({}) === JSON.stringify( params ) ) {
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
     * @returns {boolean}
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
     * @returns {boolean}
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
            let requireBy       = null
            let optionsFetch    = null
            let respond         = true

            if ( options instanceof Object && !Array.isArray( options ) ) {
                requireBy       = options.requireBy
                optionsFetch    = options.options
                respond         = options.respond || respond

                const elementRepository = this.entityManager.getRepository( element )

                elementRepository.find( requireBy, optionsFetch )
                .then( element => {
                    if ( element ) {
                        resolve( element )
                    } else {
                        if ( respond ) {
                            this.response.notFound()
                        }
                        reject( "Element not found" )
                    }
                })
                .catch( error => {
                    if ( respond ) {
                        this.response.internalServerError( error )
                    }
                    reject( error )
                })
            } else {
                reject( 'Missing parameter "requireBy" in doesRequiredElementExists()' )
            }
        })
    }

    /**
     * methodNotAllowed - when a method is used on a route which not provide that method for this route
     */
    methodNotAllowed() {
        this.reponse.methodNotAllowed()
    }

    /**
     * isDevEnv - check if we are in dev environment
     *
     * @returns {boolean}
     */
    isDevEnv() {
        return 'development' === process.env.NODE_ENV
    }

    /**
     * isProdEnv - check if we are in prod environment
     *
     * @returns {boolean}
     */
    isProdEnv() {
        return !this.isDevEnv()
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
     * get - entity manager instance
     *
     * @returns {EntityManager}
     */
    get entityManager() {
        return this._entityManager
    }

    /**
     * get - access service
     *
     * @returns {AccessSecurityService}
     */
    get access() {
        return this._access
    }
}
