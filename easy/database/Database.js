/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const ConfigLoader = require( 'easy/core/ConfigLoader' )

/**
 * @class Database
 */
class Database {
    /**
     * @constructor
     */
    constructor( config ) {
        this._config = config
        this.init()
    }

    /**
     * init - init attributes
     */
    init() {
        this._instance = null
        this._connected = false
    }

    /**
     * load - load database config
     */
    start() {
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
     * connect - connect database to instance
     */
    connect() {
        this.instance = this.config.instance
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
