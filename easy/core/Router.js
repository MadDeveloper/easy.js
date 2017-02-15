/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const ConfigLoader = require( './ConfigLoader' )
const Configurable = require( '../interfaces/Configurable' )
const Http = require( '../http/Http' )
const Request = require( '../http/Request' )
const Response = require( '../http/Response' )
const AnalyzerSecurityConfig = require( '../security/AnalyzerSecurityConfig' )
const Access = require( '../security/Access' )
const AnalyzerMiddlewaresConfig = require( '../middlewares/AnalyzerMiddlewaresConfig' )
const { indexOf } = require( 'lodash' )

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
        this._config = ConfigLoader.loadFromGlobal( 'bundles/activated' )
        this.application = null
        this.http = new Http()
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
        this.access = new Access( application.container )
    }

	/**
	 * init - init app routing
	 */
	load() {
		/*
		 * Express router
		 */
		const router = this.scope

	    /*
	     * Bundles routes
	     */
        this.loadBundlesRoutes()

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
     * loadBundlesRoutes - load all bundles routes
     */
    loadBundlesRoutes() {
        this.config.forEach( bundle => this.parseBundleRoutes( bundle ) )
    }

    /**
     * parseBundleRoutes - parse bundles routes and implement all middlewares and routes into express router
     *
     * @param  {Object} bundle
     */
    parseBundleRoutes( bundle ) {
        let controllers = {}
        let routesConfig = {}
        let configValue = ''

        for( let controller in bundle.controllers ) {
            controllers[ controller ] = new bundle.controllers[ controller ]( this.application.container )
        }

        for( let routeName in bundle.routes ) {
            routesConfig = bundle.routes[ routeName ]

            /*
             * Security
             */
            if ( this.analyzerSecurityConfig.analyze( routesConfig ) ) {
                this.defineAccessRoute( routeName, routesConfig )
            }

            /*
             * Middlewares
             */
            if ( this.analyzerMiddlewaresConfig.analyze( routesConfig ) ) {
                this.defineMiddlewaresRoutes( routesConfig, controllers )
            }

            /*
             * Methods
             */
            for ( let config in routesConfig ) {
                configValue = routesConfig[ config ]

                if ( this.http.methods.includes( config ) ) {
                    const [ controllerId, controllerMethod ] = configValue.split( ':' )

                    this.defineRoute({
                        route: routeName,
                        method: config,
                        controller: controllers[ controllerId ],
                        controllerMethod: controllerMethod
                    })
                }
            }

            this.defineMethodNotAllowedRoute( routeName )
        }
    }

    /**
     * defineMiddlewaresRoutes - define all middlewares into express router
     *
     * @param  {Object} configurations
     * @param  {Controller[]} controller
     */
    defineMiddlewaresRoutes( configurations, controllers ) {
        const router = this.scope
        const middlewaresConfig = this.analyzerMiddlewaresConfig.extractMiddlewaresConfig( configurations )
        let middleware = ''
        let middlewareInfos = {}

        for ( let config in middlewaresConfig ) {
            config = middlewaresConfig[ config ]
            middlewareInfos = this.analyzerMiddlewaresConfig.extractMiddlewareInfos( config )

            const [ controllerId, controllerMethod ] = middlewareInfos.middleware.split( ':' )
            const controller = controllers[ controllerId ]

            router[ middlewareInfos.type ]( middlewareInfos.param, async ( req, res, next ) => {
                const request = this.getRequest( req )
                const response = this.getResponse( res, request )

                const authorized = await controller[ controllerMethod ]( request, response )

                if ( authorized ) {
                    next()
                }
            })
        }
    }

    /**
     * defineAccessRoute - define access rules for specific route
     *
     * @param  {string} route
     * @param  {Object} configurations
     */
    defineAccessRoute( route, configurations ) {
        const router = this.scope

        router.use( route, async ( req, res, next ) => {
            const securityConfig = this.analyzerSecurityConfig.extractSecurityConfig( configurations )
            const request = this.getRequest( req )
            const response = this.getResponse( res, request )
            const handler = this.access.getAccessHandler( securityConfig )
            const authorized = await handler.authorized({
                configurations: securityConfig,
                request,
                response,
                container: this.application.container
            })

            if ( authorized ) {
                next()
            } else {
                response.forbidden()
            }
        })
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
