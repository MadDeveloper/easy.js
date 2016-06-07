export default class Database {
    constructor( container ) {
        this._defaultConnector  = 'bookshelf'
        this._databasePath      = `${container.kernel.path.config}/database/database`
        this._connection        = null
    }

    connect( connector = this.defaultConnector ) {
        this.connection = ( require( this.databasePath ) ).default( connector ) /* .default is needed to patch babel exports.default build, require doesn't work, import do */

        return this.connection
    }

    /*
     * Getters and setters
     */
    get connection() {
        return this._connection
    }

    set connection ( connection ) {
        this._connection = connection
        return this
    }

    get defaultConnector() {
        return this._defaultConnector
    }

    get databasePath() {
        return this._databasePath
    }
}