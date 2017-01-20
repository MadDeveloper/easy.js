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
const Document = require( '../interfaces/Document' )

/**
 * @class File
 */
class File extends Document {
    /**
     * @constructor
     *
     * @param {string} filePath=''
     * @param {string} content=''
     */
    constructor( filePath = '', content = '' ) {
        super()

        this.path = path.resolve( filePath )
        this.content = content
    }

    /**
     * addContent
     *
     * @param {string} content=''
     *
     * @returns {File}
     */
    addContent( content = '' ) {
        this.content += content

        return this
    }

    /**
     * addContent
     *
     * @param {string} content=''
     *
     * @returns {File}
     */
    setContent( content = '' ) {
        this.content = content

        return this
    }

    /**
     * exists - check if path is a file
     *
     * @returns {Promise}
     */
    exists() {
        return new Promise( ( resolve, reject ) => {
            fs.lstat( this.path, ( error, stat ) => {
                if ( error || !stat.isFile() ) {
                    reject( error )
                }

                resolve()
            })
        })
    }

    /**
     * exists - check, in synchronous maner, if path is a file
     *
     * @returns {boolean}
     */
    existsSync() {
        try {
            return fs.lstatSync( this.path ).isFile()
        } catch( error ) {
            return false
        }
    }

    /**
     * read
     *
     * @param {object} options={encoding: 'utf8'}
     *
     * @returns {Promise}
     */
    read( options = { encoding: 'utf8' }) {
        return new Promise( ( resolve, reject ) => {
            fs.readFile( this.path, options, ( error, data ) => {
                if ( error ) {
                    reject( error )

                    return
                }

                resolve( data )
            })
        })
    }

    /**
     * read
     *
     * @param {object} options={encoding: 'utf8'}
     *
     * @returns {object}
     */
    readSync( options = { encoding: 'utf8' }) {
        let results = { success: false, data: null, error: null }

        try {
            results.data = fs.readFileSync( this.path, options )
            results.success = true
        } catch ( error ) {
            results.error = error
        } finally {
            return results
        }
    }

    /**
     * create - create file at indicated path
     *
     * @param {number} options = { mode: 755, encoding: 'utf8' }
     *
     * @returns {Promise}
     */
    create( options = { mode: 755, encoding: 'utf8' }) {
        /*
         * Create is equivalent to write with no content
         */
        return this.write( options )
    }

    /**
     * createSync - create, in synchronous maner, directory at indicated path
     *
     * @param {object} options = { mode: 755, encoding: 'utf8' }
     *
     * @returns {boolean}
     */
    createSync( options = { mode: 755, encoding: 'utf8' }) {
        /*
         * Create synchronously is equivalent to write synchronously with no content
         */
        return this.writeSync( options )
    }

    /**
     * write - write in the file
     *
     * @param {number} options = { mode: 755, encoding: 'utf8' }
     *
     * @returns {Promise}
     */
    write( options = { mode: 755, encoding: 'utf8' }) {
        return new Promise( ( resolve, reject ) => {
            if ( options.hasOwnProperty( 'mode' ) ) {
                options.mode = parseInt( options.mode, 8 )
            }

            fs.writeFile( this.path, this.content, options, error => error ? reject( error ) : resolve() )
        })
    }

    /**
     * writeSync - write in the file as synchronous maner
     *
     * @param {number} options = { mode: 755, encoding: 'utf8' }
     *
     * @returns {boolean}
     */
    writeSync( options = { mode: 755, encoding: 'utf8' }) {
        try {
            if ( options.hasOwnProperty( 'mode' ) ) {
                options.mode = parseInt( options.mode, 8 )
            }

            fs.writeFileSync( this.path, this.content, options )

            return true
        } catch ( error ) {
            return false
        }
    }

    /**
     * delete - delete directory
     */
    delete() {
        throw new Error( 'Not implemented yet' )
    }

    /**
     * rename - rename repository
     */
    rename() {
        throw new Error( 'Not implemented yet' )
    }

    /**
     * move - move repository
     */
    move() {
        throw new Error( 'Not implemented yet' )
    }
}

module.exports = File
