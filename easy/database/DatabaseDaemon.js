/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * @class DatabaseDaemon
 */
class DatabaseDaemon {
    /**
     * constructor
     */
    constructor() {
        this.managed = null
        this.attemps = 0
        this.interval = null
    }

    /**
     * attach - attach database to handle
     *
     * @param  {Database} database
     * @returns {DatabaseDaemon}
     */
    attach( database ) {
        this.managed = database

        return this
    }

    /**
     * manage - manage database attached
     */
    manage() {
        this.managed.start()
        this.verifyConnection()
            .then( () => this.defineAsStarted() )
            .catch( () => this.definedAsStopped() )
    }

    /**
     * verifyConnection - verify if connection is established with database
     */
    verifyConnection() {
        return this.managed.instance.knex.raw( 'select 1+1 as result' )
    }

    /**
     * defineAsStarted - define database as started
     */
    defineAsStarted() {
        this.managed.connected = true
        this.stopIntervalTryingReconnect()
        this.startIntervalCheckConnection()
    }

    /**
     * definedAsStopped - define database as stopped
     */
    definedAsStopped() {
        this.managed.connected = false
        this.stopIntervalCheckConnection()
        this.startIntervalTryingReconnect()
    }

    /**
     * startIntervalCheckConnection - start interval to check database connection even if it started
     */
    startIntervalCheckConnection() {
        if ( null === this.interval ) {
            this.interval = setInterval( () => {
                this.verifyConnection().catch( () => this.definedAsStopped() )
            }, this.managed.config.intervalToCheckConnection )
        }
    }

    /**
     * stopIntervalCheckConnection - stop interval to check database connection even if it started
     */
    stopIntervalCheckConnection() {
        if ( null !== this.interval ) {
            clearInterval( this.interval )
            this.interval = null
        }
    }

    /**
     * startIntervalTryingReconnect - start interval to trying establish connection with the database
     */
    startIntervalTryingReconnect() {
        if ( null === this.interval ) {
            this.attemps = 0
            this.interval = setInterval( () => {
                if ( this.attemps < this.managed.config.maxAttempsReconnect ) {
                    this.managed.restart()
                    this.verifyConnection()
                        .then( () => {
                            this.defineAsStarted()
                        })
                        .catch( () => this.attemps++ )
                } else {
                    this.stopIntervalTryingReconnect()
                }
            }, this.managed.config.intervalToTryingReconnect )
        }
    }

    /**
     * stopIntervalTryingReconnect - stop interval to trying establish connection with the database
     */
    stopIntervalTryingReconnect() {
        if ( null !== this.interval ) {
            clearInterval( this.interval )
            this.interval = null
        }
    }
}

module.exports = DatabaseDaemon
