/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const File = require( '../fs/File' )
const Console = require( '../core/Console' )
const { strtr } = require( '../lib/string' )

/**
 * @class LogWriter
 */
class LogWriter {
    /**
     * Creates an instance of LogWriter.
     *
     * @constructor
     *
     * @param {LogDirectoryManager} logDirectoryManager
     *
     * @memberOf LogWriter
     */
    constructor( logDirectoryManager ) {
        this.logDirectoryManager = logDirectoryManager
    }

    /**
     * General log method
     *
     * @param {string} fileName
     * @param {string} message
     * @param {object} context
     */
    async write( fileName, message, context ) {
        const filePath = `${this.logDirectoryManager.logDirectoryPath}/${fileName}.log`

        try {
            const file = await new File( filePath )
            const exists = await file.exists()

            if ( !exists ) {
                await file.create()
            }

            file.write( strtr( message, context ) )
        } catch ( error ) {
            Console.error({ title: `Impossible to writing on file ${fileName}.log at: ${filePath}`, message: error })
        }
    }
}

module.exports = LogWriter
