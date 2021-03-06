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
    constructor( logger ) {
        this.managed = null
        this.attemps = 0
        this.interval = null
        this.logger = logger
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
    async manage() {
        const established = await this.verifyConnection()

        if ( established ) {
            this.defineAsStarted()
        } else {
            this.defineAsStopped()
        }

        return established
    }

    /**
     * verifyConnection - verify if connection is established with database
     *
     * @returns {boolean}
     */
    async verifyConnection() {
        try {
            const established = await this.managed.verifyConnectionHandler()

            return !!established
        } catch ( error ) {
            return false
        }
    }

    /**
     * defineAsStarted - define database as started
     */
    defineAsStarted() {
        this.stopIntervalTryingReconnect()
        this.startIntervalCheckConnection()
    }

    /**
     * defineAsStopped - define database as stopped
     */
    defineAsStopped() {
        this.managed.disconnect()
        this.stopIntervalCheckConnection()
        this.startIntervalTryingReconnect()
        this.logger.critical( `The connection to the database "${this.managed.name}" has been lost` )
    }

    /**
     * startIntervalCheckConnection - start interval to check database connection even if it started
     */
    startIntervalCheckConnection() {
        if ( null === this.interval ) {
            this.interval = setInterval( async () => {
                try {
                    const established = await this.verifyConnection()

                    if ( !established ) {
                        this.defineAsStopped()
                    }
                } catch ( error ) {
                    this.defineAsStopped()
                }
            }, this.managed.config.config.intervalToCheckConnection )
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
            this.interval = setInterval( async () => {
                if ( this.attemps < this.managed.config.config.maxAttempsReconnect ) {
                    try {
                        await this.managed.restart()

                        if ( this.managed.connected ) {
                            this.defineAsStarted()
                        } else {
                            this.attemps++
                        }
                    } catch ( error ) {
                        this.attemps++
                    }
                } else {
                    this.stopIntervalTryingReconnect()
                }
            }, this.managed.config.config.intervalToTryingReconnect )
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
