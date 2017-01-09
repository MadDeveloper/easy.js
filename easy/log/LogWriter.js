/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const fs = require( 'fs' )
const Injectable = require( '../interfaces/Injectable' )
const Console = require( '../core/Console' )
const { strtr } = require( '../lib/string' )

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
