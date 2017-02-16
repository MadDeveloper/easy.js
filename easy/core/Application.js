/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const fs = require( 'fs' )
const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const morgan = require( 'morgan' )
const helmet = require( 'helmet' )
const cors = require( 'cors' )
const compression = require( 'compression' )
const cookieParser = require( 'cookie-parser' )
const passport = require( 'passport' )
const ContainerBuilder = require( '../provider/ContainerBuilder' )
const Polyfills = require( './Polyfills' )
const ConfigLoader = require( './ConfigLoader' )
const Router = require( './Router' )
const Authentication = require( '../authentication/Authentication' )
const Configurable = require( '../interfaces/Configurable' )
const DatabasesManager = require( '../database/DatabasesManager' )

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
        this.router = null
        this.appName = null
        this.databasesManager = null
    }

    /**
     * configure - configure application
     */
    configure() {
        this.configureEnvironment()

        /*
         * Build container
         */
        const containerBuilder = new ContainerBuilder( this )
        containerBuilder.configure({ includeComponents: true })

        /*
         * Create and daemonize databases
         */
        this.databasesManager = new DatabasesManager( this, containerBuilder.container )
        this.databasesManager.load()

        containerBuilder.addToBuild( 'component.databasesmanager', this.databasesManager )

        /*
         * Get some components
         */
        this.container = containerBuilder.build()
        this.router = this.container.get( 'component.router' )
        this.logFileManager = this.container.get( 'component.logfilemanager' )

        /*
         * Configure components
         */
        this.appName = this.config.app.name
        this.router.configure( this, express.Router() )
    }

    /**
     * configure node environment
     *
     * @memberOf Application
     */
    configureEnvironment() {
        /*
         * API environement
         */
        if ( this.config.app.production ) {
            process.env.NODE_ENV = 'production'
        } else {
            process.env.NODE_ENV = 'development'
        }
    }

    /**
     * start - start application
     */
    async start() {
        await this.startDatabases()
        this.plugThirdPartyMiddlewares()
        this.exposeRawBody()
        this.plugAuthentication()
        this.router.load()
        this.initializePassport()
        this.plugMiddlewareLogger()
        this.app.use( '/', this.router.scope )
    }

    /**
     * start all databases
     *
     * @returns {Promise}
     *
     * @memberOf Application
     */
    async startDatabases() {
        return this.databasesManager.start()
    }

    /**
     * plugThirdPartyMiddlewares - plug third-party middlewares
     */
    plugThirdPartyMiddlewares() {
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
    }

    /**
     * exposeRawBody - permit to retrieve rawBody
     */
    exposeRawBody() {
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
     * initializePassport - initialize passport
     */
    initializePassport() {
        this.app.use( passport.initialize() )
    }

    /**
     * plugMiddlewareLogger - Trace everything that happens on the server
     */
    plugMiddlewareLogger() {
        if ( this.config.app.log ) {
            this.app.use( morgan( ':date - [:method :url] - [:status, :response-time ms, :res[content-length] B] - [HTTP/:http-version, :remote-addr, :user-agent]', { stream: fs.createWriteStream( `${this.kernel.path.root}/logs/traffic.log`, { flags: 'a' }) }) )
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
     * isProdEnv - check if we are in prod environment
     *
     * @returns {boolean}
     */
    isProdEnv() {
        return !this.isDevEnv()
    }
}

module.exports = Application
