/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const ConfigLoader = require( 'easy/core/ConfigLoader' )
const EventsEmitter = require( 'events' )

/**
 * @class Database
 */
class Database {
    /**
     * @constructor
     */
    constructor( config ) {
        this._config = config
        this.stateEmitter = new EventsEmitter()
        this.name = config.config.name
        this.init()
    }

    /**
     * init - init attributes
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
     * load - load database config
     */
    async start() {
        await this.connect()
    }

    /**
     * restart - restart database component
     */
    async restart() {
        this.resetProperties()
        await this.start()
    }

    /**
     * connect - connect database to instance
     */
    async connect() {
        const { instance, connected, error } = await this.config.connector()
        const oldConnected = this.connected

        this.instance = instance
        this.connected = connected
        this.connectionError = error

        if ( this.connected !== oldConnected ) {
            this.stateEmitter.emit( 'change', this.connected )
        }

        if ( error ) {
            throw new Error( error )
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
     * verifyConnectionHandler - handler called by daemon which indicates if database still available or not
     *
     * @returns {Promise}
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
     * get - get database instance
     *
     * @returns {Object}
     */
    get instance() {
        return this._instance
    }

    /**
     * set - set database instance
     *
     * @param  {Object} instance
     * @returns {Object}
     */
    set instance( instance ) {
        this._instance = instance
        return this._instance
    }

    /**
     * get - get database connection state
     *
     * @returns {Object}
     */
    get connected() {
        return this._connected
    }

    /**
     * set - set database connection state
     *
     * @param  {boolean} connected
     * @returns {Database}
     */
    set connected( connected ) {
        this._connected = connected
        return this
    }

    /**
     * get - get database configurations
     *
     * @returns {Object}
     */
    get config() {
        return this._config
    }

    /**
     * Get connection error
     *
     * @readonly
     *
     * @memberOf Database
     */
    get connectionError() {
        return this._connectionError
    }

    /**
     * Set connection error
     *
     * @returns {Database}
     *
     * @memberOf Database
     */
    set connectionError( error ) {
        this._connectionError = error

        return this
    }
}

module.exports = Database
