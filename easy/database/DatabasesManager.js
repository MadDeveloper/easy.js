/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const ConfigLoader = require( '../core/ConfigLoader' )
const EntityManager = require( './EntityManager' )
const DatabaseDaemon = require( './DatabaseDaemon' )
const Database = require( './Database' )

/**
 * @class DatabasesManager
 */
class DatabasesManager {
    /**
     * @constructor
     *
     * @param {Application} application
     * @param {Container} container
     */
    constructor( application, container ) {
        this.config = ConfigLoader.loadFromGlobal( 'database' )
        this.application = application
        this.bundlesPath = application.kernel.path.bundles
        this.container = container
        this.baseComponentNamespace = 'component.entitymanager'
        this.ems = new Map()
    }

    /**
     * load all entity manager
     *
     * @returns {type} Description
     */
    load() {
        if ( this.hasConfiguredDatabases() ) {
            for ( let configName in this.config ) {
                this.createEntityManager( configName, this.config[ configName ])
            }
        } else {
            this.createEntityManager( 'default', {})
        }
    }

    /**
     * start manager
     */
    async start() {
        if ( this.hasConfiguredDatabases() ) {
            for ( let [ databaseName, em ] of this.ems ) {
                if ( em.database ) {
                    await this.startDatabase( em.database )
                }
            }
        }
    }

    /**
     * Start a database
     *
     * @param {Database} database
     *
     * @memberOf DatabasesManager
     */
    async startDatabase( database ) {
        const logger = this.container.get( 'component.logger' )

        try {
            if ( database ) {
                await database.start()
            }
        } catch ( error ) {
            await logger.critical( `An error occured when trying to connect to the database "${database.config.config.name}".\n${error}\n` )
        } finally {
            if ( database && database.config.config.enableDaemon ) {
                await this.daemonizeDatabase( database )
            }
        }
    }

    /**
     * Get all databases states
     *
     * @returns {Map}
     *
     * @memberOf DatabasesManager
     */
    getDatabasesStates() {
        const states = new Map()

        for ( let [ databaseName, em ] of this.ems ) {
            states.set( databaseName, { state: em.database.connected, onStateChange: handler => em.database.connectToStateEmitter( handler ) })
        }

        return states
    }

    /**
     * Create entity manager with database associated
     *
     * @param {string} name
     * @param {Object} config
     */
    createEntityManager( name, config ) {
        const em = new EntityManager()
        const database = new Database( config )

        em.configure( this.bundlesPath, database )
        this.addEntityManager( name, em )
        this.injectEntityManagerInContainer( name, em )
    }

    /**
     * Inject entity manager into default container
     *
     * @param {string} name
     * @param {EntityManager} em
     */
    injectEntityManagerInContainer( name, em ) {
        let entityManagerNamespace = this.baseComponentNamespace

        if ( 'default' !== name.toLowerCase() ) {
            entityManagerNamespace += `.${name}`
        }

        this.container.register( entityManagerNamespace, em )
    }

    /**
     * Add new entity manager in Map
     *
     * @param {string} name
     * @param {EntityManager} em
     */
    addEntityManager( name, em ) {
        this.ems.set( name, em )
    }

    /**
     * getEntityManager - Description
     *
     * @param {string} [name=default] Description
     *
     * @returns {type} Description
     */
    getEntityManager( name = 'default' ) {
        let entityManagerNamespace = this.baseComponentNamespace

        if ( 'default' !== name.toLowerCase() ) {
            entityManagerNamespace += `.${name}`
        }

        return this.container.get( entityManagerNamespace )
    }

    /**
     * Daemonize database
     *
     * @param {any} database
     *
     * @memberOf DatabasesManager
     */
    async daemonizeDatabase( database ) {
        const daemon = new DatabaseDaemon( this.container.get( 'component.logger' ) )
        await daemon.attach( database ).manage()
    }

    /**
     * hasConfiguredDatabases - check if databases are configured in configurations
     *
     * @returns {boolean}
     */
    hasConfiguredDatabases() {
        return Reflect.ownKeys( this.config ).length > 0
    }
}

module.exports = DatabasesManager
