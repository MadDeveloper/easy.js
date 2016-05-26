import fs from 'fs'

export default class LogWriter {
    constructor( container ) {
        this._logFileManager    = container.getComponent( 'LogFileManager' )
        this._cli               = container.getComponent( 'Console' )
        this._string            = container.getLibrary( 'String' )
    }

    /**
     * General log method
     *
     * @param message
     * @param context
     * @param level
     * @return null
     */
    write( file, message, context ) {
        this.logFileManager.openLogFile( file )
        .then( fd => {
            fs.write( fd, this.string.strtr( message, context ), null, 'utf8' )
        })
        .catch( error => {
            this.cli.error({
                title: `Impossible to open/create ${file}.log at: ${this.logDirectoryPath}/${file}.log`,
                message: error,
                type: 'error'
            })
        })
    }

    /*
     * Getters and setters
     */
    get logFileManager() {
        return this._logFileManager
    }

    get cli() {
        return this._cli
    }

    get string() {
        return this._string
    }
}
