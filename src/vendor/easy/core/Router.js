import Component 		from './Component'
import Authentication	from './Authentication'

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

        this._scope = null
		this._container = container
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

	    /*
		 * Authentication
		 */
	    router.all( '*', ( req, res, next ) => {
			new Authentication()
	    })

	    /*
	     * Bundles routes definitions
	     */
	    bundleManager.getBundlesDefinitionRouting( router, this._container, request, response )

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
}
