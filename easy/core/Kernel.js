/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const express = require( 'express' )
const path = require( 'path' )
const Configuration = require( './Configuration' )
const Bundle = require( './Bundle' )
const Configurable = require( '../interfaces/Configurable' )
const ContainerBuilder = require( '../container/ContainerBuilder' )
const Router = require( './Router' )
const DatabasesManager = require( '../database/DatabasesManager' )
const LogDirectoryManager = require( '../log/LogDirectoryManager' )

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
        this._container = null
		this._logDirectoryManager = null
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

		this._logDirectoryManager = new LogDirectoryManager()
		this.logDirectoryManager.createLogDirectoryIfNotExists()
    }

    /**
     * Load all bundles
     *
     * @memberOf Kernel
     */
    loadBundles() {
        const bundles = Configuration.load( 'bundles/activated' )

        bundles.forEach( indexModule => new Bundle( indexModule, this.router, this.container ).load() )
    }

    /**
     * Load Easy components
     *
     * @memberOf Kernel
     */
    loadComponents() {
        /*
         * Prepare container
         */
        const containerBuilder = new ContainerBuilder()
        containerBuilder.configure({ includeComponents: true })

        /*
         * Start and daemonize databases
         */
        this._databasesManager = new DatabasesManager( containerBuilder.container )
        this._databasesManager.load()

        /*
         * Build container
         */
        containerBuilder.addToBuild( 'component.databasesmanager', this.databasesManager )

        /*
         * Get some others components
         */
        this._container = containerBuilder.build()
        this._router = this.container.get( 'component.router' )

        this.router.configure( this.container, express.Router() )
    }

    /**
     * Get all paths of the application
     *
     * @returns {object}
     */
    get path() {
        return this._path
    }

	/**
	 * Get databases manager
	 *
	 * @readonly
	 *
	 * @returns {DatabasesManager}
	 *
	 * @memberOf Kernel
	 */
	get databasesManager() {
		return this._databasesManager
	}

	/**
	 * Get container
	 *
	 * @readonly
	 *
	 * @returns {Container}
	 *
	 * @memberOf Kernel
	 */
	get container() {
		return this._container
	}

	/**
	 * Get router
	 *
	 * @readonly
	 *
	 * @returns {Router}
	 *
	 * @memberOf Kernel
	 */
	get router() {
		return this._router
	}

	/**
	 * Get log directory manager
	 *
	 * @readonly
	 *
	 * @returns {LogDirectoryManager}
	 *
	 * @memberOf Kernel
	 */
	get logDirectoryManager() {
		return this._logDirectoryManager
	}
}

module.exports = Kernel
