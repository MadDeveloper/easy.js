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
        this._config = null
        this.application = null
        this.access = new Access()
        this.analyzerSecurityConfig = new AnalyzerSecurityConfig()
        this.analyzerMiddlewaresConfig = new AnalyzerMiddlewaresConfig()
    }

    /**
     * configure - configure easy.js router
     *
     * @param  {Application} application
     */
    configure( application, router ) {
        this.application = application
        this._scope = router
        this._config = Configuration.load( 'bundles/activated' )
    }

	/**
	 * Add default final not found route
	 */
	addNotFoundRoute() {
		/*
		 * Express router
		 */
		const router = this.scope

	    /*
	     * Final middleware: No route found
	     */
	    router.use( ( req, res ) => {
	        if ( !res.headersSent ) {
	            res.status( 404 ).end()
	        }
	    })
	}

    /**
     * defineMiddlewaresRoutes - define all middlewares into express router
     *
     * @param {Object} configurations
     * @param {string} httpMethod
     * @param {Controller[]} controller
     */
    defineMiddlewaresRoutes( configurations, httpMethod, controllers ) {
        const router = this.scope
        const middlewaresConfig = this.analyzerMiddlewaresConfig.extractMiddlewaresConfig( configurations )
        let middleware = ''
        let middlewareInfos = {}
        httpMethod = httpMethod.toLowerCase()

        for ( let config in middlewaresConfig ) {
            config = middlewaresConfig[ config ]
            middlewareInfos = this.analyzerMiddlewaresConfig.extractMiddlewareInfos( config )

            const [ controllerId, controllerMethod ] = middlewareInfos.controller.split( ':' )
            const controller = controllers[ controllerId ]

            router[ middlewareInfos.type ]( middlewareInfos.param, async ( req, res, next ) => {
                const request = this.getRequest( req )

                if ( 'all' === httpMethod || httpMethod === request.getMethod().toLowerCase() ) {
                    const response = this.getResponse( res, request )
                    const authorized = await controller[ controllerMethod ]( request, response )

                    if ( authorized ) {
                        next()
                    }
                } else {
                    next()
                }
            })
        }
    }

    /**
     * defineSecurityRoute - define access rules for specific route
     *
     * @param {string} route
     * @param {string} httpMethod
     * @param {Object} configurations
     */
    defineSecurityRoute( route, httpMethod, configurations ) {
        const router = this.scope
        httpMethod = httpMethod.toLowerCase()

        router.use( route, async ( req, res, next ) => {
            const request = this.getRequest( req )

            if ( 'all' === httpMethod || httpMethod === request.getMethod().toLowerCase() ) {
                const securityConfig = this.analyzerSecurityConfig.extractSecurityConfig( configurations )
                const response = this.getResponse( res, request )
                const handler = this.getAccessHandler( securityConfig )
                const authorized = await handler.authorized({
                    configurations: securityConfig,
                    request,
                    response,
                    container: this.application.container
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
     * getAccessHandler - returns access authority handler
     *
     * @param  {Object} configurations
     * @returns {Access|Service}
     */
    getAccessHandler( configurations ) {
        return 'default' === configurations.strategy ? this.access : this.application.container.get( configurations.provider )
    }

    /**
     * defineRoute - define route into express router
     *
     * @param  {string} { route
     * @param  {string} method
     * @param  {Controller} controller
     * @param  {Function} controllerMethod }
     */
    defineRoute({ route, method, controller, controllerMethod }) {
        const router = this.scope

        method = method.toLowerCase()

        router.route( route )[ method ]( ( req, res ) => {
            const request = this.getRequest( req )
            const response = this.getResponse( res, request )

            controller[ controllerMethod ]( request, response )
        })
    }

    /**
     * defineMethodNotAllowedRoute - define route on all http verbs which returns 405 Method Not Allowed
     *
     * @param  {string} route
     */
    defineMethodNotAllowedRoute( route ) {
        const router = this.scope

        router.route( route ).all( ( req, res ) => {
            const request = this.getRequest( req )
            const response = this.getResponse( res, request )

            response.methodNotAllowed()
        })
    }

	/**
	 * Add check token route
	 *
	 * @memberOf Authentication
	 */
	addCheckTokenRoute() {
		/*
		 * Verify token
		 */
		this.scope.use( async ( req, res, next ) => {
			const request = this.getRequest( req )
			const response = this.getResponse( res, request )
			const authorized = await this.authorization.checkToken( request, response )

			if ( authorized ) {
				next()
			} else {
				response.unauthorized()
			}
		})
	}

    /**
     * getRequest - get easy Request instance
     *
     * @param  {express.Request} req
     * @returns {Request}
     */
    getRequest( req ) {
        return new Request( req, this.application.appName )
    }

    /**
     * getResponse - get easy Response instance
     *
     * @param  {express.Response} res
     * @param  {Request} request
     * @returns {Response}
     */
    getResponse( res, request ) {
        return new Response( res, request, this.application.container.get( 'component.logger' ) )
    }

    /**
     * get - express router
     *
     * @returns {express.Router}
     */
    get scope() {
        return this._scope
    }

    /**
     * get - routes config
     *
     * @returns {Array}
     */
    get config() {
        return this._config
    }
}

module.exports = Router
