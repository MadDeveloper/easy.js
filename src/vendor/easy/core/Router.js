import Injectable       from './Injectable'
import Authentication	from './../authentication/Authentication'
import Authorization    from './../authentication/Authorization'
import ConfigLoader     from './ConfigLoader'
import { find }    		from 'lodash'

/**
 * @class Router
 * @extends Injectable
 */
export default class Router extends Injectable {
    /**
     * @constructor
     */
    constructor( container ) {
        super()

        this._scope       = null
		this._container   = container
        this._config      = ConfigLoader.loadFromGlobal( 'routes' )
    }

	/**
	 * init - init app routing
	 *
	 * @param  {BundleManager} bundleManager
	 */
	init( bundleManager ) {
		/*
		 * Express router
		 */
		const router = this.scope

		/*
		 * Authentication management
		 */
		const authentication  = new Authentication( router )
        const authorization   = new Authorization()

		if ( authentication.config.enabled ) {
            /*
             * Init authentication
             */
            authentication.init()

			/*
			 * Verify token
			 */
			router.use( ( req, res, next ) => {
                /*
                 * Apply authotization only for not publics routes
                 */
                if ( find( this.config.public, pattern => req.originalUrl.match( new RegExp( pattern, 'i' ) ) ) ) {
                    next()
                } else {
                    authorization.authorized( req, res, next )
                }

			})
		}

	    /*
	     * Bundles routes definitions
	     */
	    bundleManager.getBundlesRoutes( router )

	    /*
	     * Final middleware: No route found
	     */
	    router.use( ( req, res ) => {
	        if ( !res.headersSent ) { // if you want strict mode, comment this condition
	            res.status( 404 ).end()
	        }
	    })
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
     * set - express router
     *
     * @param  {express.Router} scope
     * @returns {Router}
     */
    set scope( scope ) {
        this._scope = scope
        return this
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
