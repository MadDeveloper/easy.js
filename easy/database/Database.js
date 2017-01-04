const ConfigLoader = require( 'easy/core/ConfigLoader' )

/**
 * @class Database
 */
class Database {
    /**
     * @constructor
     */
    constructor() {
        this._databasePath = ''
        this.init()
    }

    /**
     * init - init attributes
     */
    init() {
        this._instance = null
        this._connected = false
        this._config = null
    }

    /**
     * load - load database config
     */
    start() {
        this._config = ConfigLoader.loadFromGlobal( 'database' )
        this.connect()
    }

    /**
     * restart - restart database component
     */
    restart() {
        this.init()
        this.start()
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

    /**
     * get - get database configurations
     *
     * @returns {Object}
     */
    get config() {
        return this._config
    }
}

module.exports = Database
