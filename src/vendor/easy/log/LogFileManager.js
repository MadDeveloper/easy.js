import fs   from 'fs'
import path from 'path'

export default class LogFileManager {
    constructor() {
        this._logDirectoryPath  = `${__dirname}/../../../../logs`
    }

    /**
     * Open log file (create it if doesn't exist) and returns it
     *
     * @param name
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
     * @param name
     */
    openLogFileSync( name ) {
        return fs.openSync( path.resolve( `${this.logDirectoryPath}/${name}.log` ), 'a+' )
    }

    /*
     * Getters and setters
     */
    get logDirectoryPath() {
        return this._logDirectoryPath
    }
}
