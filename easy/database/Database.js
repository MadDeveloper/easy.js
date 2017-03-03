/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Configuration = require( 'easy/core/Configuration' )
const EventsEmitter = require( 'events' )

/**
 * @class Database
 */
class Database {
    /**
     * @constructor
	 * @param {Object} config
     */
    constructor( config ) {
        this._config = config
        this.stateEmitter = new EventsEmitter()
        this.init()
    }

    /**
     * Init attributes
     */
    init() {
        this._instance = null
        this._connector = this._config.connector
        this.resetProperties()
    }

    /**
     * Reset instance and connected state
     *
     * @memberOf Database
     */
    resetProperties() {
        this._connected = false
        this._connectionError = null
    }

    /**
     * Load database config
     */
    async start() {
        await this.connect()
    }

    /**
     * Restart database component
     */
    async restart() {
        this.resetProperties()
        await this.start()
    }

    /**
     * Connect database to instance
     *
     * @throws {Error} if database connection cannot be established
     */
    async connect() {
        const { instance, connected, error } = await this.config.connector()
        const oldConnected = this.connected

        this.instance = instance
        this._connected = connected
        this._connectionError = error

        if ( this.connected !== oldConnected ) {
            this.stateEmitter.emit( 'change', this.connected )
        }

        if ( error ) {
            throw new Error( `Error when trying to connect to database ${this.name}\n${error}` )
        }
    }

    /**
     * Reset database connection and instance
     *
     * @memberOf Database
     */
    disconnect() {
        const oldConnected = this.connected
        this.resetProperties()

        if ( this.connected !== oldConnected ) {
            this.stateEmitter.emit( 'change', this.connected )
        }
    }

    /**
     * Handler called by daemon which indicates if database still available or not
     *
     * @returns {Promise<boolean>}
     *
     * @memberOf Database
     */
    verifyConnectionHandler() {
        return this.config.verifyConnectionHandler()
    }

    /**
     * Branch handler on database state events
     *
     * @param {Function} handler
     *
     * @memberOf Database
     */
    connectToStateEmitter( handler ) {
        this.stateEmitter.on( 'change', handler )
    }

    /**
     * Get database name
     *
     * @readonly
     *
     * @memberOf Database
     */
    get name() {
        return this.config.config.name
    }

    /**
     * Get database instance
     *
     * @returns {Object}
     */
    get instance() {
        return this._instance
    }

    /**
     * Set database instance
     *
     * @param  {Object} instance
     * @returns {Object}
     */
    set instance( instance ) {
        this._instance = instance
        return this._instance
    }

    /**
     * Get database connection state
     *
     * @returns {Object}
     */
    get connected() {
        return this._connected
    }

    /**
     * Get database configurations
     *
     * @returns {Object}
     */
    get config() {
        return this._config
    }

    /**
     * Get connection error
	 *
	 * @returns {Error}
     *
     * @readonly
     *
     * @memberOf Database
     */
    get connectionError() {
        return this._connectionError
    }
}

module.exports = Database
