/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const fs = require( 'fs' )
const Console = require( '../core/Console' )
const { strtr } = require( '../lib/string' )

/**
 * @class LogWriter
 */
class LogWriter {
    /**
     * @constructor
     * @param  {LogFileManager} logFileManager
     */
    constructor( logFileManager ) {
        this._logFileManager = logFileManager
    }

    /**
     * General log method
     *
     * @param {string} file
     * @param {string} message
     * @param {object} context
     */
    async write( file, message, context ) {
        try {
            const fd = await this.logFileManager.openLogFile( file )

            if ( fd ) {
                fs.write( fd, strtr( message, context ), null, 'utf8', error => {})
            }
        } catch ( error ) {
            Console.error({ title: `Impossible to open or create ${file}.log at: ${this.logDirectoryPath}/${file}.log`, message: error })
        }
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
