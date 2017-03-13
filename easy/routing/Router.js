/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Configuration = require( '../core/Configuration' )
const Configurable = require( '../interfaces/Configurable' )
const Request = require( '../http/Request' )
const Response = require( '../http/Response' )
const Access = require( '../security/Access' )
const AnalyzerMiddlewaresConfig = require( '../middleware/AnalyzerMiddlewaresConfig' )
const AnalyzerSecurityConfig = require( '../security/AnalyzerSecurityConfig' )
const extract = require( '../lib/extract' )

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
     * Define new middleware from configurations
     *
     * @param {Object} configurations
     * @param {string} httpMethod
     * @param {string} controllerAction
     */
    middleware( configurations, httpMethod, controllerAction ) {
        const router = this.scope
		const analyzerMiddlewaresConfig = new AnalyzerMiddlewaresConfig()
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
    security( route, httpMethod, configurations ) {
        const router = this.scope
        const analyzerSecurityConfig = new AnalyzerSecurityConfig( configurations )
        const securityConfig = analyzerSecurityConfig.extractSecurityConfig()
        const handler = this.accessHandler( securityConfig )

        httpMethod = httpMethod.toLowerCase()

        router.use( route, async ( req, res, next ) => {
            const request = new Request( req )

            if ( 'all' === httpMethod || httpMethod === request.getMethod().toLowerCase() ) {
				const response = new Response( res )

				try {
					const authorized = await handler.authorized({
						configurations: securityConfig,
						request,
						response,
						container: this._container
					})

					if ( authorized ) {
						next()
					} else if ( !response.headersAlreadySent() ) {
						response.forbidden()
					}
				} catch ( error ) {
					response.internalServerError()
				}
            } else {
                next()
            }
        })
    }

    /**
     * Define route into express router
     *
     * @param {string} route
     * @param {string} method
     * @param {string} action
     */
    route( route, method, action ) {
        const router = this.scope

		if ( this._isControllerMethod( action ) ) {
			const [ controller, controllerMethod ] = extract.controllerAndAction( actions )

			action = controller[ controllerMethod ]
		}

        method = method.toLowerCase()

        router.route( route )[ method ]( ( req, res ) => action( new Request( req ), new Response( res ) ) )
    }

	/**
	 * Check if action is a method callable from a controller
	 *
	 * @param {any} action
	 * @returns {boolean}
	 *
	 * @private
	 *
	 * @memberOf Router
	 */
	_isControllerMethod( action ) {
		return 'string' === typeof action
	}

    /**
     * Returns access authority handler
     *
     * @param {Object} configurations
     * @returns {SecurityAccess}
     */
    accessHandler( configurations ) {
        return 'default' === configurations.strategy ? this.access : this._container.get( configurations.provider )
    }

	/**
	 * Add not found route
	 */
	notFound() {
		const router = this.scope

	    router.use( ( req, res ) => {
			const response = new Response( res )

	        if ( !response.headersAlreadySent() ) {
	            response.notFound()
	        }
	    })
	}

    /**
     * Define route on all http verbs which returns 405 Method Not Allowed
     *
     * @param {string} route
     */
    methodNotAllowed( route ) {
        const router = this.scope

        router.route( route ).all( ( req, res ) => new Response( res ).methodNotAllowed() )
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
