const ConfigLoader  = require( 'easy/core/ConfigLoader' )

/**
 * @class Database
 */
class Database {
    /**
     * constructor
     */
    constructor() {
        this._databasePath  = ''
        this._instance      = null
        this._connected     = false
        this.config         = ConfigLoader.loadFromGlobal( 'database/database' )
    }

    /**
     * connect - connect database to connector
     */
    connect() {
        this.instance = this.config.connector
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
}

module.exports = Database
