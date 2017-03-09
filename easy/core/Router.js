/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Configuration = require( './Configuration' )
const Configurable = require( '../interfaces/Configurable' )
const Request = require( '../http/Request' )
const Response = require( '../http/Response' )
const Access = require( '../security/Access' )
const AnalyzerMiddlewaresConfig = require( '../middlewares/AnalyzerMiddlewaresConfig' )
const AnalyzerSecurityConfig = require( '../security/AnalyzerSecurityConfig' )

/**
 * @class Router
 * @extends Configurable
 */
class Router extends Configurable {
    /**
     * @constructor
     */
    constructor() {
        super()

        this._scope = null
        this._container = null
        this._access = new Access()
    }

    /**
     * Configure easy router
     *
     * @param {Container} container
	 * @param {Object} router
     */
    configure( container, router ) {
        this._container = container
        this._scope = router
    }

	/**
	 * Add not found route
	 */
	addNotFoundRoute() {
		const router = this.scope

	    router.use( ( req, res ) => {
			const response = new Response( res )

	        if ( !response.headersAlreadySent() ) {
	            response.notFound()
	        }
	    })
	}

    /**
     * Define new middleware from configurations
     *
     * @param {Object} configurations
     * @param {string} httpMethod
     * @param {Controller[]} controllers
     */
    defineMiddlewareRoute( configurations, httpMethod, controllers ) {
        const router = this.scope
		const analyzerMiddlewaresConfig = new AnalyzerMiddlewaresConfig( configurations )
		const middlewareInfos = analyzerMiddlewaresConfig.extractMiddlewareConfig( configurations )

        httpMethod = httpMethod.toLowerCase()

		const [ controllerId, controllerMethod ] = middlewareInfos.controller.split( ':' )
		const controller = controllers[ controllerId ]

		router[ middlewareInfos.type ]( middlewareInfos.param, async ( req, res, next ) => {
			const request = new Request( req )

			if ( 'all' === httpMethod || httpMethod === request.getMethod().toLowerCase() ) {
				const response = new Response( res )
				const authorized = await controller[ controllerMethod ]( request, response )

				if ( authorized ) {
					next()
				}
			} else {
				next()
			}
		})
    }

    /**
     * Define access rules for specific route
     *
     * @param {string} route
     * @param {string} httpMethod
     * @param {Object} configurations
     */
    defineSecurityRoute( route, httpMethod, configurations ) {
        const router = this.scope
        const analyzerSecurityConfig = new AnalyzerSecurityConfig( configurations )
        const securityConfig = analyzerSecurityConfig.extractSecurityConfig()
        const handler = this.getAccessHandler( securityConfig )

        httpMethod = httpMethod.toLowerCase()

        router.use( route, async ( req, res, next ) => {
            const request = new Request( req )

            if ( 'all' === httpMethod || httpMethod === request.getMethod().toLowerCase() ) {
                const response = new Response( res )
                const authorized = await handler.authorized({
                    configurations: securityConfig,
                    request,
                    response,
                    container: this._container
                })

                if ( authorized ) {
                    next()
                }
            } else {
                next()
            }
        })
    }

    /**
     * Returns access authority handler
     *
     * @param {Object} configurations
     * @returns {SecurityAccess}
     */
    getAccessHandler( configurations ) {
        return 'default' === configurations.strategy ? this.access : this._container.get( configurations.provider )
    }

    /**
     * Define route into express router
     *
     * @param {string} { route
     * @param {string} method
     * @param {Controller} controller
     * @param {Function} controllerMethod }
     */
    defineRoute({ route, method, controller, controllerMethod }) {
        const router = this.scope

        method = method.toLowerCase()

        router.route( route )[ method ]( ( req, res ) => {
            const request = new Request( req )
            const response = new Response( res )

            controller[ controllerMethod ]( request, response )
        })
    }

    /**
     * Define route on all http verbs which returns 405 Method Not Allowed
     *
     * @param {string} route
     */
    defineMethodNotAllowedRoute( route ) {
        const router = this.scope

        router.route( route ).all( ( req, res ) => {
            const request = new Request( req )
            const response = new Response( res )

            response.methodNotAllowed()
        })
    }

    /**
     * Get express router
     *
     * @returns {Object}
     */
    get scope() {
        return this._scope
    }

	/**
	 * Get security access instance
	 *
	 * @readonly
	 *
	 * @returns {SecurityAccess}
	 *
	 * @memberOf Router
	 */
	get access() {
		return this._access
	}
}

module.exports = Router
