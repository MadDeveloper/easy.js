const fs = require( 'fs' )
const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const morgan = require( 'morgan' )
const helmet = require( 'helmet' )
const cors = require( 'cors' )
const compression = require( 'compression' )
const cookieParser = require( 'cookie-parser' )
const numeral = require( 'numeral' )
const { indexOf } = require( 'lodash' )
const passport = require( 'passport' )
const ContainerBuilder = require( 'easy/container/ContainerBuilder' )
const Console = require( 'easy/core/Console' )
const Polyfills = require( 'easy/core/Polyfills' )
const ConfigLoader = require( 'easy/core/ConfigLoader' )
const Router = require( 'easy/core/Router' )
const Authentication = require( 'easy/authentication/Authentication' )
const Configurable = require( 'easy/interfaces/Configurable' )
const Database = require( 'easy/database/Database' )
const EntityManager = require( 'easy/database/EntityManager' )

/**
 * @class Application
 */
class Application extends Configurable {
    /**
     * constructor
     *
     * @param  {Kernel} kernel
     */
    constructor( kernel ) {
        super()

        /*
         * First, load all polyfills
         */
        Polyfills.load()

        this.kernel = kernel
        this.container = null
        this.config = ConfigLoader.loadFromGlobal( 'app' )
        this.app = express()
    }

    /**
     * configure - configure application
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
         * Create and try to connect database
         */
        this.database = new Database()
        this.database.connect()

        /*
         * Build container
         */
        const containerBuilder = new ContainerBuilder( this )

        /*
         * Get some components
         */
        this.container = containerBuilder.configure({ includeComponents: true }).addToBuild( 'component.database', this.database ).build()
        this.router = this.container.get( 'component.router' )
        this.entityManager = this.container.get( 'component.entitymanager' )
        this.logFileManager = this.container.get( 'component.logfilemanager' )

        /*
         * Configure components
         */
        this.appName = this.config.app.name
        this.entityManager.configure( this.kernel.path.bundles, this.database )
        this.router.configure( this, express.Router() )
    }

    /**
     * start - start application
     */
    start() {
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
        this.router.load()

        /*
         * Initialize Passport
         */
        this.app.use( passport.initialize() )

        /*
         * Trace everything that happens on the server
         */
        if ( this.config.app.log ) {
            this.app.use( morgan( ':date - [:method :url] - [:status, :response-time ms, :res[content-length] B] - [HTTP/:http-version, :remote-addr, :user-agent]', { stream: fs.createWriteStream( `${this.kernel.path.root}/logs/traffic.log`, { flags: 'a' }) }) )
        }

        /*
         * Auto call to gc
         */
        let warnDisplayed = false

        this.app.get( '/gc', ( req, res, next ) => {
            if ( global.gc ) {
                global.gc()
                res.status( 200 ).end()
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
     * plugAuthentication - Plug authentication on application
     */
    plugAuthentication() {
        /*
		 * Authentication management
		 */
		const authentication = new Authentication( this.container, passport )

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
