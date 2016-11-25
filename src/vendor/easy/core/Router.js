const ConfigLoader                  = require( './ConfigLoader' )
const Configurable                  = require( './../interfaces/Configurable' )
const Request                       = require( './../http/Request' )
const Response                      = require( './../http/Response' )
const Http                          = require( './../http/Http' )
const AnalyzerSecurityConfig        = require( './../security/AnalyzerSecurityConfig' )
const AnalyzerMiddlewaresConfig     = require( './../middlewares/AnalyzerMiddlewaresConfig' )
const Access                        = require( './../security/Access' )
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
     * configure - description
     *
     * @param  {type} application description
     * @returns {type}             description
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
     * loadBundlesRoutes - description
     *
     * @param  {type} bundles description
     * @returns {type}         description
     */
    loadBundlesRoutes( bundles ) {
        let bundle = {}

        for( let bundleName in bundles ) {
            bundle = bundles[ bundleName ]
            this.parseBundleRoutes( bundle )
        }
    }

    /**
     * parseBundleRoutes - description
     *
     * @param  {type} bundle description
     * @returns {type}        description
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
                this.defineMiddlewaresRoutes( routeName, routesConfig, controller )
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
     * defineMiddlewaresRoutes - description
     *
     * @param  {type} route          description
     * @param  {type} configurations description
     * @returns {type}                description
     */
    defineMiddlewaresRoutes( route, configurations, controller ) {
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
     * defineAccessRoute - description
     *
     * @param  {type} route          description
     * @param  {type} configurations description
     * @returns {type}                description
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
     * defineRoute - description
     *
     * @param  {type} { route            description
     * @param  {type} method             description
     * @param  {type} controller         description
     * @param  {type} controllerMethod } description
     * @returns {type}                    description
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
     * defineMethodNotAllowed - description
     *
     * @param  {type} route description
     * @returns {type}       description
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
     * getRequest - description
     *
     * @param  {type} req description
     * @returns {type}     description
     */
    getRequest( req ) {
        return new Request( req, this.application.appName )
    }

    /**
     * getResponse - description
     *
     * @param  {type} res     description
     * @param  {type} request description
     * @returns {type}         description
     */
    getResponse( res, request ) {
        return new Response( res, request, this.application.container.getComponent( 'Logger' ) )
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
