import Request      from './../http/Request'
import Response     from './../http/Response'
import ConfigLoader from './ConfigLoader'

/**
 * @class Controller
 */
export default class Controller {
    /**
     * @constructor
     */
    constructor( application ) {
        this._entityManager = application.entityManager
        this._container     = application.container
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
     * isDevEnv - check if we are in dev environment
     *
     * @returns {boolean}
     */
    isDevEnv() {
        return 'development' === process.env.NODE_ENV.toLowerCase()
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
	 * buildController - build anonymous controller
	 *
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @returns {Controller}
	 */
	static buildAnonymous( req, res ) {
		return new Controller( req, res )
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
}
