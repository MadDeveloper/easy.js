import Component        from './Component'
import Authentication	from './../authentication/Authentication'
import ConfigLoader     from './ConfigLoader'
import { find }    		from 'lodash'

/**
 * @class Router
 * @extends Component
 */
export default class Router extends Component {
    /**
     * @constructor
     */
    constructor( container ) {
        super()

        this._scope       = null
		this._container   = container
        this._config      = ConfigLoader.loadFromGlobal( 'routing' )
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
		const authentication = new Authentication( router )

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
                 * Apply authentication only for protected routes
                 */
                if ( find( this.config.protected, pattern => req.originalUrl.match( new RegExp( pattern, 'i' ) ) ) ) {
                    authentication.isLogged( req, res, next )
                } else {
                    next()
                }

			})
		}

	    /*
	     * Bundles routes definitions
	     */
	    bundleManager.getBundlesDefinitionRouting( router )

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
     * get - routing config
     *
     * @returns {Array}
     */
    get config() {
        return this._config
    }
}
