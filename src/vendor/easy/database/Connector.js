import fs   from 'fs'
import path from 'path'

export default class Connector {
    constructor( container ) {
        this._kernel            = container.kernel
        this._message           = container.getComponent( 'Message' )
        this._defaultConnector  = 'bookshelf'
        this._databasePath      = this._kernel.path.config + '/database/database'
        this._connection        = null
    }

    connect( connector ) {
        if ( !connector ) {
            // use default connector
            connector = this.defaultConnector
        }

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

    get kernel() {
        return this._kernel
    }

    get message() {
        return this._message
    }
}
