import fs   from 'fs'
import path from 'path'

/**
 * @class LogFileManager
 */
export default class LogFileManager {
    /**
     * @constructor
     */
    constructor() {
        this._logDirectoryPath = `${__dirname}/../../../../logs`
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
     * get - log directory path (default: ~/logs)
     *
     * @returns {string}
     */
    get logDirectoryPath() {
        return this._logDirectoryPath
    }
}
