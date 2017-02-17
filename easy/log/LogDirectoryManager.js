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
            this.createLogDirectory()
        }
    }

    /**
     * Create logs directory if doesn't exist
     *
     * @memberOf LogFileManager
     */
    createLogDirectory() {
        const directory = new Directory( this.logDirectoryPath )

        if ( !directory.existsSync() && !directory.createSync().success ) {
            Console.error({
                title: `Impossible to create log directory: ${this.logDirectoryPath}`,
                message: error.toString()
            })
        }
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
