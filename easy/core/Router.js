const ConfigLoader                  = require( 'easy/core/ConfigLoader' )
const Configurable                  = require( 'easy/interfaces/Configurable' )
const Request                       = require( 'easy/http/Request' )
const Response                      = require( 'easy/http/Response' )
const Http                          = require( 'easy/http/Http' )
const AnalyzerSecurityConfig        = require( 'easy/security/AnalyzerSecurityConfig' )
const AnalyzerMiddlewaresConfig     = require( 'easy/middlewares/AnalyzerMiddlewaresConfig' )
const Access                        = require( 'easy/security/Access' )
const { indexOf }                   = require( 'lodash' )

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

        this._scope                     = null
        this._config                    = ConfigLoader.loadFromGlobal( 'bundles' )
        this.application                = null
        this.http                       = new Http()
        this.analyzerSecurityConfig     = new AnalyzerSecurityConfig()
        this.analyzerMiddlewaresConfig  = new AnalyzerMiddlewaresConfig()
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
	 *
	 * @param  {BundleManager} bundleManager
	 */
	load( bundleManager ) {
		/*
		 * Express router
		 */
		const router = this.scope

	    /*
	     * Bundles routes
	     */
        this.loadBundlesRoutes( bundleManager.bundles )

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
     * loadBundlesRoutes - load all enabled bundles routes
     *
     * @param  {Array} bundles
     */
    loadBundlesRoutes( bundles ) {
        let bundle = {}

        for( let bundleName in bundles ) {
            bundle = bundles[ bundleName ]
            this.parseBundleRoutes( bundle )
        }
    }

    /**
     * parseBundleRoutes - parse bundles routes and implement all middlewares and routes into express router
     *
     * @param  {Object} bundle
     */
    parseBundleRoutes( bundle ) {
        const controller = new bundle.controller( this.application.container )

        let routesConfig = {}, configValue = ''

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
                this.defineMiddlewaresRoutes( routesConfig, controller )
            }

            /*
             * Methods
             */
            for ( let config in routesConfig ) {
                configValue = routesConfig[ config ]

                if ( -1 !== indexOf( this.http.methods, config ) ) {
                    this.defineRoute({
                        route: routeName,
                        method: config,
                        controller,
                        controllerMethod: configValue
                    })
                }
            }

            this.defineMethodNotAllowed( routeName )
        }
    }

    /**
     * defineMiddlewaresRoutes - define all middlewares into express router
     *
     * @param  {Object} configurations
     * @param  {Controller} controller
     */
    defineMiddlewaresRoutes( configurations, controller ) {
        const router            = this.scope
        const middlewaresConfig = this.analyzerMiddlewaresConfig.extractMiddlewaresConfig( configurations )
        let middleware          = ''
        let middlewareInfos     = {}

        for ( let config in middlewaresConfig ) {
            config = middlewaresConfig[ config ]
            middlewareInfos = this.analyzerMiddlewaresConfig.extractMiddlewareInfos( config )

            router[ middlewareInfos.type ]( middlewareInfos.param, ( req, res, next ) => {
                const request   = this.getRequest( req )
                const response  = this.getResponse( res, request )

                controller[ middlewareInfos.middleware ]( request, response )
                    .then( () => next() )
                    .catch( () => {} )
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

        router.use( route, ( req, res, next ) => {
            const securityConfig    = this.analyzerSecurityConfig.extractSecurityConfig( configurations )
            const request           = this.getRequest( req )
            const response          = this.getResponse( res, request )
            const handler           = this.access.getAccessHandler( securityConfig )

            handler
                .authorized({ 
                    configurations: securityConfig,
                    request,
                    response,
                    container: this.application.container
                })
                .then( () => next() )
                .catch( () => response.forbidden() )
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
            const request   = this.getRequest( req )
            const response  = this.getResponse( res, request )

            controller[ controllerMethod ]( request, response )
        })
    }

    /**
     * defineMethodNotAllowed - define route on all http verbs which returns 405 Method Not Allowed
     *
     * @param  {string} route
     */
    defineMethodNotAllowed( route ) {
        const router = this.scope

        router.route( route ).all( ( req, res ) => {
            const request   = this.getRequest( req )
            const response  = this.getResponse( res, request )

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
