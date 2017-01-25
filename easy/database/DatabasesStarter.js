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
 * @class DatabasesStarter
 */
class DatabasesStarter {
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
        this.ems = {}
    }

    load() {
        for ( let configName in this.config ) {
            this.createEntityManager( configName, this.config[ configName ])
        }
    }

    start() {
        for ( let emName in this.ems ) {
            const { em, database } = this.ems[ emName ]
            this.daemonizeDatabase( database )
        }
    }

    createEntityManager( name, config ) {
        const em = new EntityManager()
        const database = new Database( config )

        em.configure( this.bundlesPath, database )

        this.addEntityManager( name, em, database )
        this.injectEntityMangerInContainer( name, em )
    }

    injectEntityMangerInContainer( name, em ) {
        let entityManagerNamespace = 'component.entitymanager'

        if ( 'default' !== name.toLowerCase() ) {
            entityManagerNamespace += `.${name}`
        }

        this.container.register( entityManagerNamespace, em )
    }

    addEntityManager( name, em, database ) {
        this.ems[ name ] = {
            em,
            database
        }
    }

    daemonizeDatabase( database ) {
        const daemon = new DatabaseDaemon()
        daemon.attach( database ).manage()
    }
}

module.exports = DatabasesStarter
