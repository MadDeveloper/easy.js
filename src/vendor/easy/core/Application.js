const fs                = require( 'fs' )
const express           = require( 'express' )
const bodyParser        = require( 'body-parser' )
const morgan            = require( 'morgan' )
const helmet            = require( 'helmet' )
const cors              = require( 'cors' )
const compression       = require( 'compression' )
const cookieParser      = require( 'cookie-parser' )
const numeral           = require( 'numeral' )
const { indexOf }       = require( 'lodash' )
const passport          = require( 'passport' )
const Container         = require( './Container' )
const Console           = require( './Console' )
const Polyfills         = require( './Polyfills' )
const ConfigLoader      = require( './ConfigLoader' )
const Authentication	 = require( './../authentication/Authentication' )
const Router            = require( './Router' )
const BundleManager     = require( './BundleManager' )
const Configurable      = require( './../interfaces/Configurable' )
const Database          = require( './../database/Database' )
const EntityManager     = require( './../database/EntityManager' )

/**
 * @class Application
 */
class Application extends Configurable {
    /**
     * constructor - description
     *
     * @param  {type} kernel description
     * @returns {type}        description
     */
    constructor( kernel ) {
        super()

        /*
         * First, load all polyfills
         */
        Polyfills.load()

        this.kernel         = kernel
        this.container      = new Container( this, kernel.path )
        this.config         = ConfigLoader.loadFromGlobal( 'app' )
        this.app            = express()
    }

    /**
     * configure - description
     *
     * @returns {type}  description
     */
    configure() {
        /*
         * API environement
         */
        if ( this.config.app.production ) {
            process.env.NODE_ENV = 'production'
        } else {
            process.env.NODE_ENV = 'development'
        }

        /*
         * Load container components
         */
        this.container.loadComponents()
        this.database       = this.container.getComponent( 'database' )
        this.router         = this.container.getComponent( 'router' )
        this.bundleManager  = this.container.getComponent( 'bundlemanager' )
        this.entityManager  = this.container.getComponent( 'entitymanager' )

        /*
         * Configure components
         */
        this.logFileManager = this.container.getComponent( 'LogFileManager' )
        this.appName = this.config.app.name
        this.entityManager.configure( this.kernel.path.bundles, this.database )
        this.bundleManager.configure( this.kernel.path.bundles )
        this.router.configure( this, express.Router() )
        this.bundleManager.loadBundles()
    }

    /**
     * start - description
     *
     * @returns {type}  description
     */
    start() {
        /*
         * Connect database following configurations
         */
        this.database.connect()

        /*
         * Will permit to retrieve remote ip: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']
         */
        this.app.enable( 'trust proxy' )

        /*
         * Parse cookies
         */
        this.app.use( cookieParser() )

        /*
         * Enable CORS: https://www.w3.org/TR/cors/
         */
        this.app.use( cors() )

         /*
          * Just a collection of nine smaller middleware functions that set security-related HTTP headers
          */
        this.app.use( helmet() )

        /*
         * Gzip compression (can greatly decrease the size of the response body)
         */
        this.app.use( compression() )

        /*
         * body-parser middleware for handling request variables
         */
        this.app.use( bodyParser.json() ) // support json encoded bodies
        this.app.use( bodyParser.urlencoded({ extended: true }) ) // support encoded bodies

        /*
         * Permit to retrieve rawBody
         */
        this.app.use( ( req, res, next ) => {
            const method = req.method.toLowerCase()
            const contentType = req.headers[ 'content-type' ] || ''
            const mime = contentType.split( ';' )[ 0 ]
            let data = ''

            if ( 'text/plain' !== mime ) {
                return next()
            }

            req.setEncoding( 'utf8' )
            req.on( 'data', chunk => {
                data += chunk
            })
            req.on( 'end', () => {
                req.rawBody = data
                next()
            })
        })

        /*
         * Plug authentication process
         */
        this.plugAuthentication()

        /*
         * Loads all the app routes
         */
        this.router.load( this.bundleManager )

        /*
         * Initialize Passport
         */
        this.app.use( passport.initialize() )

        /*
         * Trace everything that happens on the server
         */
        if ( this.config.app.log ) {
            this.app.use( morgan( ':date - [:method :url] - [:status, :response-time ms, :res[content-length] B] - [HTTP/:http-version, :remote-addr, :user-agent]', { stream: fs.createWriteStream( `${__dirname}/../../../../logs/traffic.log`, { flags: 'a' } ) } ) )
        }

        /*
         * Auto call to gc
         */
        let warnDisplayed = false

        this.app.use( ( req, res, next ) => {
            if ( global.gc ) {
                global.gc()
            } else if ( false === warnDisplayed ) {
                Console.warn( "You should launch node server with npm start command in order to enable gc.\n" )
                warnDisplayed = true
            }

            next()
        })

        /*
         * See memory usage if specified
         */
        if ( this.config.app.memory ) {
            this.app.use( ( req, res, next ) => {
                const memory = process.memoryUsage()

                Console.info( "---- Memory usage ----" )
                Console.info( `RSS:        ${numeral( memory.rss ).format( 'bytes' )}` )
                Console.info( `Heap total: ${numeral( memory.heapTotal ).format( 'bytes' )}` )
                Console.info( `Heap used:  ${numeral( memory.heapUsed ).format( 'bytes' )}` )
                Console.info( "----------------------" )

                next()
            })
        }

        /*
         * Registration router routes
         */
        this.app.use( '/', this.router.scope )
    }

    /**
     * plugAuthentication - description
     *
     * @returns {type}  description
     */
    plugAuthentication() {
        /*
		 * Authentication management
		 */
		const authentication  = new Authentication( this.container, passport )

		if ( authentication.config.enabled ) {
            /*
             * Configure authentication
             */
            authentication.configure()
		}
    }

    /**
     * getEnv - get node environment
     *
     * @returns {string}
     */
    getEnv() {
        return process.env.NODE_ENV
    }

    /**
     * isDevEnv - check if we are in dev environment
     *
     * @returns {boolean}
     */
    isDevEnv() {
        return 'development' === this.getEnv().toLowerCase()
    }

    /**
     * isDevEnv - check if we are in dev environment
     *
     * @returns {boolean}
     */
    isProdEnv() {
        return !this.isDevEnv()
    }
}

module.exports = Application
