import Configurable from './../core/Configurable'

/**
 * @class Database
 * @extends Configurable
 */
export default class Database extends Configurable {
    constructor( container ) {
        super()

        this._databasePath  = ''
        this._instance      = null
        this._connected     = false
    }

    configure( configPath ) {
        this._databasePath = `${configPath}/database/database`
    }

    connect() {
        this.instance = require( this._databasePath ).default()
    }

    /*
     * Getters and setters
     */
    get instance() {
        return this._instance
    }

    set instance( instance ) {
        this._instance = instance
        return this._instance
    }

    get connected() {
        return this._connected
    }

    set connected( connected ) {
        this._connected = connected
        return this
    }
}
