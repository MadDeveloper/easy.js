import fs               from 'fs'
import express          from 'express'
import bodyParser       from 'body-parser'
import morgan           from 'morgan'
import helmet           from 'helmet'
import cors             from 'cors'
import compression      from 'compression'
import numeral          from 'numeral'
import { indexOf }      from 'lodash'
import passport         from 'passport'
import Console          from './Console'
import Polyfills        from './Polyfills'
import ConfigLoader     from './ConfigLoader'
import Authentication	from './../authentication/Authentication'
import Authorization    from './../authentication/Authorization'
import Router           from './Router'
import BundleManager    from './BundleManager'
import Configurable     from './Configurable'
import Database         from './../database/Database'
import EntityManager    from './../database/EntityManager'

export default class Application extends Configurable {
    constructor( kernel ) {
        super()
        
        /*
         * First, load all polyfills
         */
        Polyfills.load()

        this.kernel         = kernel
        this.container      = kernel.container
        this.config         = ConfigLoader.loadFromGlobal( 'app' )
        this.app            = express()
        this.expressRouter  = express.Router()
        this.database       = new Database()
        this.router         = new Router()
        this.bundleManager  = new BundleManager()
        this.entityManager  = new EntityManager()
        this.logFileManager = this.container.getComponent( 'LogFileManager' )
    }

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
         * Usefull to store app data with namespace into the request
         */
        this.appName = this.config.app.name

        /*
         * Configure database
         */
        this.database.configure( this.kernel.path.config )

        /*
         * Configure entity manager
         */
        this.entityManager.configure( this.kernel.path.bundles, this.database )

        /*
         * Configure bundle manager
         */
        this.bundleManager.configure( this.kernel.path.bundles )

        /*
         * Configure Router
         */
        this.router.configure( this )

        /*
         * Load all bundles enabled
         */
        this.bundleManager.loadBundles()
    }

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
            const method        = req.method.toLowerCase()
            const enableMethods = [ 'patch' ]

            let data = ''

            if ( indexOf( enableMethods, method ) < 0 ) {
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
            this.logFileManager.openLogFileSync( 'traffic' )
            this.app.use( morgan( ':date - [:method :url] - [:status, :response-time ms, :res[content-length] B] - [HTTP/:http-version, :remote-addr, :user-agent]', { stream: fs.createWriteStream( `${__dirname}/../logs/traffic.log`, { flags: 'a' } ) } ) )
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
        this.app.use( '/', this.expressRouter )
    }

    plugAuthentication() {
        /*
		 * Authentication management
		 */
		const authentication  = new Authentication( this, passport )
        const authorization   = new Authorization()

		if ( authentication.config.enabled ) {
            /*
             * Init authentication
             */
            authentication.init()

			/*
			 * Verify token
			 */
			this.expressRouter.use( ( req, res, next ) => authorization.checkToken( req, res, next ) )
		}
    }
}
