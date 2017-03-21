/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

require( './polyfills' )

const path = require( 'path' )
const Configuration = require( './Configuration' )
const Bundle = require( './Bundle' )
const Configurable = require( '../interfaces/Configurable' )
const Container = require( '../container/Container' )
const Router = require( '../routing/Router' )
const Route = require( '../routing/Route' )
const DatabasesManager = require( '../database/DatabasesManager' )
const LogDirectory = require( '../log/LogDirectory' )
const Logger = require( '../log/Logger' )
const LogWriter = require( '../log/LogWriter' )

/**
 * @class Kernel
 */
class Kernel extends Configurable {
    /**
     * @constructor
     */
    constructor() {
        super()

        this._path = {}
        this._databasesManager = null
		this._router = null
		this._logWriter = null
		this._logger = null
        this._container = null
		this._logDirectory = null
		this._bundles = new Set()
    }

    /**
     * Configure the kernel
     *
     * @param {string} appRootPath
     */
    configure( appRootPath ) {
        this.path.root = path.resolve( appRootPath )
        this.path.src = path.resolve( `${this.path.root}/src` )
        this.path.bundles = path.resolve( `${this.path.src}/bundles` )
        this.path.config = path.resolve( `${this.path.src}/config` )
        this.path.services = path.resolve( `${this.path.src}/services` )

		process.chdir( this.path.root )
        Configuration.appPath = this.path.root

		this._logDirectory = new LogDirectory()
		this.logDirectory.create()

		this._container = new Container()

        /*
         * Load components which will be injected into the container
         */
        this._router = new Router()
		this._logWriter = new LogWriter()
		this._logger = new Logger( this.logWriter )
        this._databasesManager = new DatabasesManager( this.container )
    }

    /**
     * Load all bundles
     *
     * @memberOf Kernel
     */
    loadBundles() {
        const bundles = Configuration.load( 'bundles/activated' )

        bundles.forEach( indexModule => {
			const bundle = new Bundle( indexModule, this.container )

			this.bundles.add( bundle )
			bundle.load()
		})

		this.router.bundles = this.bundles
    }

    /**
     * Load Easy components
     *
     * @memberOf Kernel
     */
    loadComponents() {
		/*
         * Prepare databases and entities managers
         */
        this.databasesManager.load()

        /*
         * Build container
         */
        this.container
			.set( 'databasesmanager', this.databasesManager )
			.set( 'router', this.router )
			.set( 'logwriter', this.logWriter )
			.set( 'logger', this.logger )

		/*
		 * Configure router
		 */
        this.router.configure({ container: this.container })
		Route.router = this.router

		/*
		 * Load user providers
		 */
		Configuration.load( 'services' )( this.container )
    }

    /**
     * Get all paths of the application
     *
     * @returns {Object}
     */
    get path() {
        return this._path
    }

	/**
	 * Get databases manager
	 *
	 * @returns {DatabasesManager}
	 *
	 * @readonly
	 *
	 * @memberOf Kernel
	 */
	get databasesManager() {
		return this._databasesManager
	}

	/**
	 * Get container
	 *
	 * @returns {Container}
	 *
	 * @readonly
	 *
	 * @memberOf Kernel
	 */
	get container() {
		return this._container
	}

	/**
	 * Get router
	 *
	 * @returns {Router}
	 *
	 * @readonly
	 *
	 * @memberOf Kernel
	 */
	get router() {
		return this._router
	}

	/**
	 * Get LogWriter instance
	 *
	 * @returns {Writer}
	 *
	 * @readonly
	 *
	 * @memberOf Kernel
	 */
	get logWriter() {
		return this._logWriter
	}

	/**
	 * Get logger instance
	 *
	 * @returns {Logger}
	 *
	 * @readonly
	 *
	 * @memberOf Kernel
	 */
	get logger() {
		return this._logger
	}

	/**
	 * Get log directory instance
	 *
	 * @returns {LogDirectory}
	 *
	 * @readonly
	 *
	 * @memberOf Kernel
	 */
	get logDirectory() {
		return this._logDirectory
	}

	/**
	 * Get all application bundles
	 *
	 * @returns {Set}
	 *
	 * @readonly
	 *
	 * @memberOf Kernel
	 */
	get bundles() {
		return this._bundles
	}
}

module.exports = Kernel
