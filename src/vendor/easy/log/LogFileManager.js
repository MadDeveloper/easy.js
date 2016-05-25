import fs   from 'fs'
import path from 'path'

export default class LogFileManager {
    constructor( container ) {
        this._logDirectoryPath  = __dirname + '/../../../../logs'
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

    /*
     * Getters and setters
     */
    get logDirectoryPath() {
        return this._logDirectoryPath
    }
}
