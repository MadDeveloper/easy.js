import fs   from 'fs'
import path from 'path'

export default class Connector {
    constructor( kernel ) {
        this._kernel            = kernel
        this._defaultConnector  = 'bookshelf'
        this._databasePath      = __dirname + '/../../../config/database/database'
        this._message           = new ( kernel.load( 'Message' ) )()
        this.connection         = null
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
