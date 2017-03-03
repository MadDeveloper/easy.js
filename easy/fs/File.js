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
const Directory = require( './Directory' )

/**
 * @class File
 */
class File extends Document {
    /**
     * @constructor
     * @param {string} filePath=''
     * @param {string} content=''
     */
    constructor( filePath = '', content = '' ) {
        super()

        this.loadPathInfo( filePath )
        this._content = content
    }

    /**
     * Load all infos relative to the file path
     *
     * @param {string} filePath
     *
     * @memberOf File
     */
    loadPathInfo( filePath ) {
        const { root, dir, base, ext, name } = path.parse( filePath )

        this.root = root
        this.base = base
        this.ext = ext
        this.name = name
        this.path = `${dir}/${base}`
        this.directory = new Directory( dir )
    }

    /**
     * Check if the file path exists
     *
     * @returns {Promise}
     */
    exists() {
        return new Promise( ( resolve, reject ) => {
            fs.lstat( this.path, ( error, stat ) => {
                if ( error || !stat.isFile() ) {
                    resolve( false )
                }

                resolve( true )
            })
        })
    }

    /**
     * Check synchronously if the file path exists
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
     * Read the file content
     *
     * @param {Object} [options={encoding: 'utf8'}]
     * @returns {Promise}
     */
    read( options = { encoding: 'utf8' }) {
        return new Promise( ( resolve, reject ) => {
            fs.readFile( this.path, options, ( error, data ) => {
                if ( error ) {
                    reject( `Error when trying to read the file (${this.path}).\n${error.message}` )
                } else {
                    this.content = data
                    resolve( data )
                }
            })
        })
    }

    /**
     * Read the file content synchronously
     *
     * @param {Object} [options={encoding: 'utf8'}]
     * @returns {string}
     *
     * @throws {Error} if file path is invalid
     */
    readSync( options = { encoding: 'utf8' }) {
        try {
            this.content = fs.readFileSync( this.path, options )

            return this.content
        } catch( error ) {
            throw new Error( `Error when trying to read synchronously the existance of the file (${this.path}).\n${error.message}` )
        }
    }

    /**
     * Create file at indicated path
     *
     * @param {number} options = { mode: 755, encoding: 'utf8' }
     * @returns {Promise}
     */
    create( options = { mode: 755, encoding: 'utf8' }) {
        /*
         * Create is equivalent to write with no content
         */
        return this.write( options )
    }

    /**
     * Create, in synchronous maner, directory at indicated path
     *
     * @param {Object} [options = { mode: 755, encoding: 'utf8' }]
     * @returns {boolean}
     *
     * @throws {Error} if file path is invalid
     */
    createSync( options = { mode: 755, encoding: 'utf8' }) {
        try {
            this.writeSync( options )

            return true
        } catch( error ) {
            throw new Error( `Error when trying to create synchronously the existance of the file (${this.path}).\n${error.message}` )
        }
    }

    /**
     * Write in the file
     *
     * @param {number} [options = { mode: 755, encoding: 'utf8' }]
     * @returns {Promise}
     */
    write( content = '', options = { mode: 755, encoding: 'utf8' }) {
        return new Promise( ( resolve, reject ) => {
            if ( content.length > 0 ) {
                this.content = content
            }

            if ( 'mode' in options ) {
                options.mode = parseInt( options.mode, 8 )
            }

            fs.writeFile( this.path, this.content, options, error => {
                if ( error ) {
                    reject( `Error when trying to write to the file (${this.path}).\n${error.message}` )
                } else {
                    resolve()
                }
            })
        })
    }

    /**
     * Write in the file as synchronous maner
     *
     * @param {number} [options = { mode: 755, encoding: 'utf8' }]
     * @returns {boolean}
     *
     * @throws {Error} if file path is invalid
     */
    writeSync( content = '', options = { mode: 755, encoding: 'utf8' }) {
        try {
            if ( content.length > 0 ) {
                this.content = content
            }

            if ( 'mode' in options ) {
                options.mode = parseInt( options.mode, 8 )
            }

            fs.writeFileSync( this.path, this.content, options )

            return true
        } catch( error ) {
            throw new Error( `Error when trying to write synchronously to the file (${this.path}).\n${error.message}` )
        }
    }

    /**
     * Delete the file
     *
     * @returns {Promise}
     *
     * @memberOf File
     */
    delete() {
        return new Promise( ( resolve, reject ) => {
            fs.unlink( this.path, error => {
                if ( error ) {
                    reject( `Error when trying to delete the file (${this.path}).\n${error.message}` )
                } else {
                    resolve()
                }
            })
        })
    }

    /**
     * Delete the file synchronously
     *
     * @returns {boolean}
     *
     * @throws {Error} if file path is invalid
     *
     * @memberOf File
     */
    deleteSync() {
        try {
            fs.unlinkSync( this.path )

            return true
        } catch( error ) {
            throw new Error( `Error when trying to delete synchronously the file (${this.path}).\n${error.message}` )
        }
    }

    /**
     * Rename the file
     *
     * @param {string} newName
     * @returns {Promise}
     *
     * @memberOf File
     */
    rename( newName ) {
        return new Promise( ( resolve, reject ) => {
            const newPath = `${this.directory.path}/${newName}`

            fs.rename( this.path, newPath, error => {
                if ( error ) {
                    reject( `Error when trying to rename the file (${this.path}).\n${error.message}` )
                } else {
                    resolve()
                }
            })

            this.loadPathInfo( newPath )
        })
    }

    /**
     * Rename the file synchronously
     *
     * @param {string} newName
     * @returns {boolean}
     *
     * @throws {Error} if file path or new path is valid
     *
     * @memberOf File
     */
    renameSync( newName ) {
        try {
            const newPath = `${this.directory.path}/${newName}`

            fs.renameSync( this.path, newPath )
            this.loadPathInfo( newPath )

            return true
        } catch( error ) {
            throw new Error( `Error when trying to rename synchronously the file (${this.path}).\n${error.message}` )
        }
    }

    /**
     * Move the file at indicated path
     *
     * @param {Object} newPath
     * @returns {Promise}
     *
     * @memberOf File
     */
    move( newPath ) {
        return this.rename( path.resolve( this.path, newPath ) )
    }

    /**
     * Move the file at indicated path synchronously
     *
     * @param {Object} newPath
     * @returns {boolean}
     *
     * @throws {Error} if file path or new path is invalid
     *
     * @memberOf File
     */
    moveSync( newPath ) {
        return this.renameSync( path.resolve( this.path, newPath ) )
    }

    /**
     * Add content to current content
     *
     * @param {string} newContent
     * @returns {File}
     *
     * @memberOf File
     */
    addContent( newContent ) {
        this.content += newContent

        return this
    }

    /**
     * Set content to current content
     *
     * @param {string} newContent
     * @returns {File}
     *
     * @memberOf File
     */
    setContent( newContent ) {
        this.content = newContent

        return this
    }

    /**
     * Get the file path
     *
     * @returns {string}
     *
     * @memberOf File
     */
    get path() {
        return this._path
    }

    /**
     * Set the file path
     *
     * @param {string} newPath
     *
     * @memberOf File
     */
    set path( newPath = '' ) {
        if ( 'string' === typeof newPath ) {
            this._path = path.resolve( newPath )
        }
    }

    /**
     * Get the file content
     *
     * @returns {string}
     *
     * @memberOf File
     */
    get content() {
        return this._content
    }

    /**
     * Set the file content
     *
     * @param {string} content
     *
     * @memberOf File
     */
    set content( content ) {
        if ( 'string' === typeof content ) {
            this._content = content
        }
    }
}

module.exports = File
