import Configurable from './../interfaces/Configurable'

/**
 * @class Database
 * @extends Configurable
 */
export default class Database extends Configurable {
    /**
     * constructor
     */
    constructor() {
        super()

        this._databasePath  = ''
        this._instance      = null
        this._connected     = false
    }

    /**
     * configure - description
     *
     * @param  {type} configPath description
     * @returns {type}            description
     */
    configure( configPath ) {
        this._databasePath = `${configPath}/database/database`
    }

    /**
     * connect - description
     *
     * @returns {type}  description
     */
    connect() {
        this.instance = require( this._databasePath ).default()
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
     * get - description    
     *
     * @returns {type}  description
     */
    get orm() {
        return this.instance
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
