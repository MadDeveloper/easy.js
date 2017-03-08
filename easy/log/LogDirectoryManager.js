/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const path = require( 'path' )
const File = require( '../fs/File' )
const Directory = require( '../fs/Directory' )

/**
 * @class LogDirectoryManager
 */
class LogDirectoryManager {
    /**
     * @constructor
     */
    constructor() {
        this._logDirectoryPath = path.resolve( './logs' )
    }

    /**
     * Create logs directory if doesn't exist
     *
     * @throws {ReferenceError} if directory path is invalid
     *
     * @memberOf LogDirectoryManager
     */
    createLogDirectoryIfNotExists() {
        const directory = new Directory( this.logDirectoryPath )

        try {
            const exists = directory.existsSync()

            if ( !exists ) {
                directory.createSync()
            }
        } catch ( error ) {
            throw new ReferenceError( `An error occured while trying to create logs directory (${this.logDirectoryPath}).\n${error}` )
        }
    }

    /**
     * Get log directory path (default: ~/logs/)
     *
     * @returns {string}
     */
    get logDirectoryPath() {
        return this._logDirectoryPath
    }
}

module.exports = LogDirectoryManager
