import Injectable from './../core/Injectable'

/**
 * @class Database
 * @extends Injectable
 */
export default class Database extends Injectable {
    constructor( container ) {
        super()

        this._databasePath  = `${container.kernel.path.config}/database/database`
        this._instance      = null
        this._connected     = false
    }

    connect() {
        this.instance = ( require( this._databasePath ) ).default() /* .default is needed to patch babel exports.default build, require doesn't work, import does */
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
