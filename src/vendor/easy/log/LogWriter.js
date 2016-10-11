import fs           from 'fs'
import Injectable   from './../core/Injectable'
import Console      from './../core/Console'

/**
 * @class LogWriter
 * @extends Injectable
 */
export default class LogWriter extends Injectable {
    /**
     * @constructor
     * @param  {Container} container
     */
    constructor( container ) {
        super()

        this._logFileManager    = container.getComponent( 'LogFileManager' )
        this._string            = container.getLibrary( 'string' )
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
            .then( fd => fs.write( fd, this.string.strtr( message, context ), null, 'utf8' ) )
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

    /**
     * get string vendor library
     *
     * @returns {object}
     */
    get string() {
        return this._string
    }
}
