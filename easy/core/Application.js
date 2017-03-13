/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Kernel = require( './Kernel' )
const fs = require( 'fs' )
const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const morgan = require( 'morgan' )
const helmet = require( 'helmet' )
const cors = require( 'cors' )
const compression = require( 'compression' )
const cookieParser = require( 'cookie-parser' )
const passport = require( 'passport' )
const Polyfills = require( './Polyfills' )
const Configuration = require( './Configuration' )
const Authentication = require( '../authentication/Authentication' )
const Configurable = require( '../interfaces/Configurable' )

/**
 * @class Application
 */
class Application extends Configurable {
    /**
     * @constructor
     */
    constructor() {
        super()

        Polyfills.load()

        this._kernel = new Kernel()
        this._config = null
        this._app = express()
    }

    /**
     * Configure the application
     *
     * @param {string} appRootPath
     */
    configure( appRootPath ) {
        this.kernel.configure( appRootPath )
        this._config = Configuration.load( 'app' )
        this._setEnvironment()
        this.kernel.loadComponents()
    }

    /**
     * Start the application
     */
    async start() {
        await this.startDatabases()
        this._plugThirdPartyMiddlewares()
        this._exposeRawBody()
        this._plugAuthentication()
        this.kernel.loadBundles()
        this.router.notFound()
        this._initializePassport()
        this._bindRoutes()
    }

    /**
     * Configure node environment
	 *
	 * @private
     *
     * @memberOf Application
     */
    _setEnvironment() {
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
     * Bind real router's routes to global route path
	 *
	 * @private
     *
     * @memberOf Application
     */
    _bindRoutes() {
        this.app.use( '/', this.router.scope )
    }

    /**
     * Start all databases
     *
     * @returns {Promise}
     *
     * @memberOf Application
     */
    async startDatabases() {
        await this.databasesManager.start()
    }

    /**
     * Plug third-party middlewares
	 *
	 * @private
     */
    _plugThirdPartyMiddlewares() {
        /*
         * Will permit to retrieve remote ips
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
        this.app.use( bodyParser.json() )
        this.app.use( bodyParser.urlencoded({ extended: true }) )

        if ( this.config.app.log ) {
            this.app.use( morgan(
                ':date - [:method :url] - [:status, :response-time ms, :res[content-length] B] - [HTTP/:http-version, :remote-addr, :user-agent]',
                { stream: fs.createWriteStream( `${this.kernel.path.root}/logs/traffic.log`, { flags: 'a' }) }
            ) )
        }

        this._plugGlobalsUserMiddlewares()
    }

    /**
     * Plug globals user middlewares
	 *
	 * @private
     *
     * @memberOf Application
     */
    _plugGlobalsUserMiddlewares() {
        const middlewares = Configuration.load( 'middlewares' )

        middlewares.forEach( middleware => this.app.use( middleware ) )
    }

    /**
     * Permit to retrieve rawBody in request
	 *
	 * @private
     */
    _exposeRawBody() {
        this.app.use( ( req, res, next ) => {
            const method = req.method.toLowerCase()
            const contentType = req.headers[ 'content-type' ] || ''
            const mime = contentType.split( ';' )[ 0 ]
            let data = ''

            if ( 'text/plain' !== mime ) {
                return next()
            }

            req.setEncoding( 'utf8' )
            req.on( 'data', chunk => data += chunk )
            req.on( 'end', () => {
                req.rawBody = data
                next()
            })
        })
    }

    /**
     * Plug authentication on application
	 *
	 * @private
     */
    _plugAuthentication() {
        /*
		 * Authentication management
		 */
		const authentication = new Authentication( this.container, passport )

		if ( authentication.config.enabled ) {
            /*
             * Activate authentication
             */
            authentication.activate()
		}
    }

    /**
     * Initialize passport
	 *
	 * @private
     */
    _initializePassport() {
        this.app.use( passport.initialize() )
    }

    /**
     * Get node environment
     *
     * @returns {string}
     */
    getEnv() {
        return process.env.NODE_ENV
    }

    /**
     * Check if we are in dev environment
     *
     * @returns {boolean}
     */
    isDevEnv() {
        return 'development' === this.getEnv().toLowerCase()
    }

    /**
     * Check if we are in prod environment
     *
     * @returns {boolean}
     */
    isProdEnv() {
        return !this.isDevEnv()
    }

	/**
	 * Get the application kernel
	 *
	 * @readonly
	 *
	 * @returns {Kernel}
	 *
	 * @memberOf Application
	 */
	get kernel() {
		return this._kernel
	}

    /**
     * Get application router
     *
     * @readonly
	 *
	 * @returns {Router}
     *
     * @memberOf Application
     */
    get router() {
        return this.kernel.router
    }

    /**
     * Get application container
     *
     * @readonly
	 *
	 * @returns {Container}
     *
     * @memberOf Application
     */
    get container() {
        return this.kernel.container
    }

    /**
     * Get databases manager
     *
     * @readonly
	 *
	 * @returns {DatabasesManager}
     *
     * @memberOf Application
     */
    get databasesManager() {
        return this.kernel.databasesManager
    }

    /**
     * Get the application name
     *
     * @readonly
	 *
	 * @returns {string}
     *
     * @memberOf Application
     */
    get appName() {
        return this.config.app.name
    }

	/**
	 * Get real app under the hood
	 *
	 * @readonly
	 *
	 * @returns {Object}
	 *
	 * @memberOf Application
	 */
	get app() {
		return this._app
	}

	/**
	 * Get application configurations
	 *
	 * @readonly
	 *
	 * @returns {Object}
	 *
	 * @memberOf Application
	 */
	get config() {
		return this._config
	}
}

module.exports = Application
