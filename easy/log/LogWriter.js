const fs            = require( 'fs' )
const Injectable    = require( 'easy/interfaces/Injectable' )
const Console       = require( 'easy/core/Console' )
const { strtr }     = require( 'easy/lib/string' )

/**
 * @class LogWriter
 * @extends Injectable
 */
class LogWriter extends Injectable {
    /**
     * @constructor
     * @param  {LogFileManager} logFileManager
     */
    constructor( logFileManager ) {
        super()

        this._logFileManager = logFileManager
    }

    /**
     * General log method
     *
     * @param {string} file
     * @param {string} message
     * @param {string} context
     */
    write( file, message, context ) {
        this.logFileManager
            .openLogFile( file )
            .then( fd => fs.write( fd, strtr( message, context ), null, 'utf8' ) )
            .catch( error => {
                Console.error({
                    title: `Impossible to open/create ${file}.log at: ${this.logDirectoryPath}/${file}.log`,
                    message: error,
                    type: 'error'
                })
            })
    }

    /**
     * get logFileManager instance
     *
     * @returns {LogFileManager}
     */
    get logFileManager() {
        return this._logFileManager
    }
}

module.exports = LogWriter