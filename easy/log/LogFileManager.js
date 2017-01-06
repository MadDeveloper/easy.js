const fs = require( 'fs' )
const path = require( 'path' )
const Injectable = require( '../interfaces/Injectable' )
const Directory = require( '../fs/Directory' )
const Console = require( '../core/Console' )

/**
 * @class LogFileManager
 * @extends Injectable
 */
class LogFileManager extends Injectable {
    /**
     * @constructor
     *
     * @param {Application} application
     */
    constructor( application ) {
        super()

        this._logDirectoryPath = `${application.kernel.path.root}/logs`

        if ( application.config.app.log ) {
            const directory = new Directory( this._logDirectoryPath )

            if ( !directory.exists() ) {
                directory.create()
            }
        }
    }

    /**
     * Open log file (create it if doesn't exist) and returns it
     *
     * @param {string} name
     */
    openLogFile( name ) {
        return new Promise( ( resolve, reject ) => {
            fs.open( path.resolve( `${this.logDirectoryPath}/${name}.log` ), 'a+', ( error, fd ) => {
                ( error ) ? reject( error ) : resolve( fd )
            })
        })
    }

    /**
     * Synchronous version of openLogFile
     *
     * @param {string} name
     */
    openLogFileSync( name ) {
        return fs.openSync( path.resolve( `${this.logDirectoryPath}/${name}.log` ), 'a+' )
    }

    /**
     * get - log directory path (default: logs/)
     *
     * @returns {string}
     */
    get logDirectoryPath() {
        return this._logDirectoryPath
    }
}

module.exports = LogFileManager
