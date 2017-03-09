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
     * @constructor
     */
    constructor( logger ) {
        this._managed = null
        this._attemps = 0
        this._interval = null
        this._logger = logger
    }

    /**
     * Attach database to handle
     *
     * @param {Database} database
     * @returns {DatabaseDaemon}
     */
    attach( database ) {
        this._managed = database

        return this
    }

    /**
     * Manage database attached
     */
    async manage() {
        const established = await this.verifyConnection()

        if ( established ) {
            this._defineAsStarted()
        } else {
            this._defineAsStopped()
        }

        return established
    }

    /**
     * Verify if connection is established with database
     *
     * @returns {boolean}
     */
    async verifyConnection() {
        try {
            return await this.managed.verifyConnectionHandler()
        } catch ( error ) {
            return false
        }
    }

    /**
     * Define database as started
	 *
	 * @private
     */
    _defineAsStarted() {
        this.stopIntervalTryingReconnect()
        this.startIntervalCheckConnection()
    }

    /**
     * Define database as stopped
	 *
	 * @private
     */
    _defineAsStopped() {
        this.managed.disconnect()
        this.stopIntervalCheckConnection()
        this.startIntervalTryingReconnect()
        this._logger.critical( `The connection to the database "${this.managed.name}" has been lost` )
    }

    /**
     * Start interval to check database connection even if it started
     */
    startIntervalCheckConnection() {
        if ( null === this.interval ) {
            this._interval = setInterval( async () => {
                try {
                    const established = await this.verifyConnection()

                    if ( !established ) {
                        this._defineAsStopped()
                    }
                } catch ( error ) {
                    this._defineAsStopped()
                }
            }, this.managed.config.config.intervalToCheckConnection )
        }
    }

    /**
     * Stop interval to check database connection even if it started
     */
    stopIntervalCheckConnection() {
        if ( null !== this.interval ) {
            clearInterval( this._interval )
            this._interval = null
        }
    }

    /**
     * Start interval to trying establish connection with the database
     */
    startIntervalTryingReconnect() {
        if ( null === this.interval ) {
            this._attemps = 0
            this._interval = setInterval( async () => {
                if ( this.attemps < this.managed.config.config.maxAttempsReconnect ) {
                    try {
                        await this.managed.restart()

                        if ( this.managed.connected ) {
                            this._defineAsStarted()
                        } else {
                            this._attemps++
                        }
                    } catch ( error ) {
                        this._attemps++
                    }
                } else {
                    this.stopIntervalTryingReconnect()
                }
            }, this.managed.config.config.intervalToTryingReconnect )
        }
    }

    /**
     * Stop interval to trying establish connection with the database
     */
    stopIntervalTryingReconnect() {
        if ( null !== this.interval ) {
            clearInterval( this._interval )
            this._interval = null
        }
    }

	/**
	 * Get the interval
	 *
	 * @returns {WindowTimers}
	 *
	 * @readonly
	 *
	 * @memberOf DatabaseDaemon
	 */
	get interval() {
		return this._interval
	}

	/**
	 * Get number attemps
	 *
	 * @returns {number}
	 *
	 * @readonly
	 *
	 * @memberOf DatabaseDaemon
	 */
	get attemps() {
		return this._attemps
	}

	/**
	 * Get database managed
	 *
	 * @returns {Database}
	 *
	 * @readonly
	 *
	 * @memberOf DatabaseDaemon
	 */
	get managed() {
		return this._managed
	}
}

module.exports = DatabaseDaemon
