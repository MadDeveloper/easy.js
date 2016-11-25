const ConfigLoader  = require( './../core/ConfigLoader' )

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
     * connect - description
     *
     * @returns {type}  description
     */
    connect() {
        this.instance = this.config.connector
    }

    /**
     * get - description
     *
     * @returns {type}  description
     */
    get instance() {
        return this._instance
    }

    /**
     * set - description
     *
     * @param  {type} instance description
     * @returns {type}          description
     */
    set instance( instance ) {
        this._instance = instance
        return this._instance
    }

    /**
     * get - description
     *
     * @returns {type}  description
     */
    get connected() {
        return this._connected
    }

    /**
     * set - description
     *
     * @param  {type} connected description
     * @returns {type}           description
     */
    set connected( connected ) {
        this._connected = connected
        return this
    }
}

module.exports = Database
