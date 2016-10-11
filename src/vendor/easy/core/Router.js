import ConfigLoader     from './ConfigLoader'
import Configurable     from './Configurable'
import Request          from './../http/Request'
import Response         from './../http/Response'
import Http             from './../http/Http'
import { indexOf }      from 'lodash'

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

        this._scope         = null
        this._config        = ConfigLoader.loadFromGlobal( 'bundles' )
        this.application    = null
        this.http           = new Http()
    }

    configure( application ) {
        this.application = application
        this._scope = application.expressRouter
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

    loadBundlesRoutes( bundles ) {
        let bundle = {}

        for( let bundleName in bundles ) {
            bundle = bundles[ bundleName ]
            this.parseBundleRoutes( bundle )
        }
    }

    parseBundleRoutes( bundle ) {
        const controller = new bundle.controller( this.application )

        let routesConfig = {}, configValue = ''

        for( let routeName in bundle.routes ) {
            routesConfig = bundle.routes[ routeName ]
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
        }
    }

    defineRoute({ route, method, controller, controllerMethod }) {
        const router = this.scope

        method = method.toLowerCase()

        router.route( route )[ method ]( ( req, res ) => {
            const request = this.buildRequest( req )
            const response = this.buildResponse( res, request )
            controller[ controllerMethod ]( request, response )
        })
    }

    buildRequest( req ) {
        return new Request( req, this.application.appName )
    }

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
