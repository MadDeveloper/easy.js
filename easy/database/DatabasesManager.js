/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Configuration = require( '../core/Configuration' )
const EntityManager = require( './EntityManager' )
const DatabaseDaemon = require( './DatabaseDaemon' )
const Database = require( './Database' )
const path = require( 'path' )

/**
 * @class DatabasesManager
 */
class DatabasesManager {
    /**
     * @constructor
     * @param {Container} container
     */
    constructor( container ) {
        this._config = Configuration.load( 'database' )
        this.bundlesPath = path.resolve( './src/bundles' )
        this.container = container
        this.baseComponentNamespace = 'entitymanager'
        this.ems = new Map()
    }

    /**
     * Load all entity manager
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
     * Start manager
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
        const logger = this.container.get( 'logger' )

        try {
            if ( database ) {
                await database.start()
            }
        } catch ( error ) {
            await logger.critical( `An error occured when trying to connect to the database (${database.config.config.name}).\n${error.stack}` )
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
        const database = new Database( config )
        const em = new EntityManager({ directorySearchPath: this.bundlesPath, database })

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
     * Get entity manager
     *
     * @param {string} [name='default']
     * @returns {type}
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
     * @param {Database} database
     *
     * @memberOf DatabasesManager
     */
    async daemonizeDatabase( database ) {
        const daemon = new DatabaseDaemon( this.container.get( 'logger' ) )

        await daemon.attach( database ).manage()
    }

    /**
     * Check if databases are configured in configurations
     *
     * @returns {boolean}
     */
    hasConfiguredDatabases() {
        return Reflect.ownKeys( this.config ).length > 0
    }

	/**
	 * Get config
	 *
	 * @returns {Object}
	 *
	 * @readonly
	 *
	 * @memberOf DatabasesManager
	 */
	get config() {
		return this._config
	}
}

module.exports = DatabasesManager
