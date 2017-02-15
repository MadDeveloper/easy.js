/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const fs = require( 'fs' )
const path = require( 'path' )
const Directory = require( '../fs/Directory' )
const Console = require( '../core/Console' )

/**
 * @class LogFileManager
 */
class LogFileManager {
    /**
     * @constructor
     *
     * @param {Application} application
     */
    constructor( application ) {
        this._logDirectoryPath = `${application.kernel.path.root}/logs`

        if ( application.config.app.log ) {
            const directory = new Directory( this._logDirectoryPath )

            if ( !directory.existsSync() && !directory.createSync().success ) {
                Console.error({
                    title: `Impossible to create directory : ${this._logDirectoryPath}`,
                    message: error.toString()
                })
            }
        }
    }

    /**
     * Open log file (create it if doesn't exist) and returns it
     *
     * @param {string} name
     *
     * @returns {Promise}
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
     *
     * @returns {fd}
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
