import ConfigLoader             from './ConfigLoader'
import Configurable             from './../interfaces/Configurable'
import Request                  from './../http/Request'
import Response                 from './../http/Response'
import Http                     from './../http/Http'
import AnalyzerSecurityConfig   from './../security/AnalyzerSecurityConfig'
import Access                   from './../security/Access'
import { indexOf }              from 'lodash'

/**
 * @class Router
 * @extends Configurable
 */
export default class Router extends Configurable {
    /**
     * @constructor
     */
    constructor() {
        super()

        this._scope                 = null
        this._config                = ConfigLoader.loadFromGlobal( 'bundles' )
        this.application            = null
        this.http                   = new Http()
        this.analyzerSecurityConfig = new AnalyzerSecurityConfig()
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
        const controller = new bundle.controller( this.application.entityManager, this.application.container )

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
             * Methods
             */
            Object.keys( routesConfig ).forEach( config => {
                configValue = routesConfig[ config ]

                if ( -1 !== indexOf( this.http.methods, config ) ) {
                    this.defineRoute({
                        route: routeName,
                        method: config,
                        controller,
                        controllerMethod: configValue
                    })
                }
            })

            this.defineMethodNotAllowed( routeName )
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
            const request           = this.buildRequest( req )
            const response          = this.buildResponse( res, request )
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
            const request   = this.buildRequest( req )
            const response  = this.buildResponse( res, request )

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
            const request   = this.buildRequest( req )
            const response  = this.buildResponse( res, request )

            response.methodNotAllowed()
        })
    }

    /**
     * buildRequest - description
     *
     * @param  {type} req description
     * @returns {type}     description
     */
    buildRequest( req ) {
        return new Request( req, this.application.appName )
    }

    /**
     * buildResponse - description
     *
     * @param  {type} res     description
     * @param  {type} request description
     * @returns {type}         description
     */
    buildResponse( res, request ) {
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
