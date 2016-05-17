import fs   from 'fs'
import path from 'path'

export default class Connector {
    constructor( container ) {
        this._container         = container
        this._kernel            = this._container.kernel
        this._message           = this._container.getComponent( 'Message' )

        this._defaultConnector  = 'bookshelf'
        this._databasePath      = __dirname + '/../../../config/database/database'
        this._connection         = null
    }

    connect( connector ) {
        if ( !connector ) {
            // use default connector
            connector = this.defaultConnector
        }

        this.connection = require( this.databasePath )( connector )
        return this.connection
    }

    /*
     * Getters and setters
     */
    get container() {
        return this._container
    }
    
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
