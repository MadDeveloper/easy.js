/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const File = require( '../fs/File' )
const { strtr } = require( '../lib/string' )
const Writer = require( '../interfaces/Writer' )
const path = require( 'path' )

/**
 * @class LogWriter
 * @extends {Writer}
 */
class LogWriter extends Writer {
    /**
     * General log method
     *
     * @param {string} fileName
     * @param {string} [message='']
     * @param {object} [context={}]
     * @returns {Promise}
     *
     * @throws {Error} if file path is incorrect or user doesn't have access rights
     */
    async write( fileName, message = '', context = {}) {
        const filePath = `${path.resolve( './logs' )}/${fileName}.log`

        try {
            const file = new File( filePath )
            const exists = await file.exists()

            if ( !exists ) {
                await file.create()
            }

            const content = await file.read()

            return file.addContent( strtr( message, context ) ).write()
        } catch ( error ) {
            throw new Error( `Impossible to writing on file ${fileName}.log (${filePath})\n${error.stack}` )
        }
    }
}

module.exports = LogWriter
