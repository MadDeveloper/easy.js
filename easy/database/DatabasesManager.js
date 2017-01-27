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
     * load - Description
     *
     * @returns {type} Description
     */
    load() {
        if ( this.hasConfiguredDatabases() ) {
            for ( let configName in this.config ) {
                this.createEntityManager( configName, this.config[ configName ])
            }
        } else {
            this.createDefaultEmptyEntityManager()
        }
    }

    /**
     * start - Description
     *
     * @returns {type} Description
     */
    start() {
        if ( this.hasConfiguredDatabases() ) {
            for ( let { em, database } of this.ems.values() ) {
                if ( null !== database ) {
                    this.daemonizeDatabase( database )
                }
            }
        }
    }

    /**
     * createEntityManager - Description
     *
     * @param {type} name   Description
     * @param {type} config Description
     */
    createEntityManager( name, config ) {
        const em = new EntityManager()
        const database = new Database( config )

        em.configure( this.bundlesPath, database )
        this.addEntityManager( name, em, database )
        this.injectEntityManagerInContainer( name, em )
    }

    /**
     * createDefaultEmptyEntityManager - create default empty entity manager
     */
    createDefaultEmptyEntityManager() {
        const em = new EntityManager()
        const database = new Database()

        em.configure( this.bundlesPath, database )
        this.addEntityManager( 'default', em, database )
        this.injectEntityManagerInContainer( 'default', em )
    }

    /**
     * injectEntityManagerInContainer - Description
     *
     * @param {type} name Description
     * @param {type} em   Description
     *
     * @returns {type} Description
     */
    injectEntityManagerInContainer( name, em ) {
        let entityManagerNamespace = this.baseComponentNamespace

        if ( 'default' !== name.toLowerCase() ) {
            entityManagerNamespace += `.${name}`
        }

        this.container.register( entityManagerNamespace, em )
    }

    /**
     * addEntityManager - Description
     *
     * @param {type} name     Description
     * @param {type} em       Description
     * @param {type} database Description
     */
    addEntityManager( name, em, database ) {
        this.ems.set( name, { em, database })
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
     * daemonizeDatabase - Description
     *
     * @param {type} database Description
     *
     * @returns {type} Description
     */
    daemonizeDatabase( database ) {
        const daemon = new DatabaseDaemon()
        daemon.attach( database ).manage()
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
