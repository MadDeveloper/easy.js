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
const ContainerBuilder = require( '../provider/ContainerBuilder' )
const Router = require( './Router' )
const DatabasesManager = require( '../database/DatabasesManager' )

/**
 * @class Kernel
 */
class Kernel extends Configurable {
    /**
     * @constructor
     */
    constructor( application ) {
        super()

        this._application = application
        this._path = {}
        this.databasesManager = null
        this.container = null
    }

    /**
     * Configure the kernel
     *
     * @param {string} appRootPath
     */
    configure( appRootPath ) {
        /*
         * paths
         */
        this.path.root = path.resolve( appRootPath )
        this.path.bin = `${this.path.root}/bin`
        this.path.src = `${this.path.root}/src`
        this.path.bundles = `${this.path.src}/bundles`
        this.path.config = `${this.path.src}/config`
        this.path.services = `${this.path.src}/services`

        Configuration.appPath = this.path.root
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
        const containerBuilder = new ContainerBuilder( this._application )
        containerBuilder.configure({ includeComponents: true })

        /*
         * Start and daemonize databases
         */
        this.databasesManager = new DatabasesManager( this, containerBuilder.container )
        this.databasesManager.load()

        /*
         * Build container
         */
        containerBuilder.addToBuild( 'component.databasesmanager', this.databasesManager )

        /*
         * Get some others components
         */
        this.container = containerBuilder.build()
        this.router = this.container.get( 'component.router' )
        this.logFileManager = this.container.get( 'component.logfilemanager' )

        this.router.configure( this._application, express.Router() )
    }

    /**
     * get - all paths
     *
     * @returns {object}
     */
    get path() {
        return this._path
    }
}

module.exports = Kernel
