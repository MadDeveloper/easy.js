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
     *
     * @param {string} filePath=''
     * @param {string} content=''
     */
    constructor( filePath = '', content = '' ) {
        super()

        this.loadPathInfo( filePath )
        this._content = content
    }

    /**
     * loadPathInfo - load all infos relative to the file path
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
     * exists - check if path is a file
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
     * @param {Object} options={encoding: 'utf8'}
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

                this.content = data
                resolve( data )
            })
        })
    }

    /**
     * read
     *
     * @param {object} options={encoding: 'utf8'}
     *
     * @returns {Object}
     */
    readSync( options = { encoding: 'utf8' }) {
        let results = { success: false, data: null }

        try {
            results.data = fs.readFileSync( this.path, options )
            results.success = true
            this.content = results.data
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
     * @returns {Object}
     */
    createSync( options = { mode: 755, encoding: 'utf8' }) {
        let results = { success: false }

        try {
            this.writeSync( options )
            results.success = true
        } catch ( error ) {
            results.error = error
        } finally {
            return results
        }
    }

    /**
     * write - write in the file
     *
     * @param {number} options = { mode: 755, encoding: 'utf8' }
     *
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

            fs.writeFile( this.path, this.content, options, error => error ? reject( error ) : resolve() )
        })
    }

    /**
     * writeSync - write in the file as synchronous maner
     *
     * @param {number} options = { mode: 755, encoding: 'utf8' }
     * @returns {Object}
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
        } catch( error ) {
            throw new Error( `Error when trying to write synchronously to the file (${this.path}).\n${error.message}` )
        }
    }

    /**
     * delete - Delete the file
     *
     * @returns {Promise}
     *
     * @memberOf File
     */
    delete() {
        return new Promise( ( resolve, reject ) => {
            fs.unlink( this.path, error => error ? reject( error ) : resolve() )
        })
    }

    /**
     * deleteSync - Delete the file synchronously
     *
     * @returns {Object}
     *
     * @throws {Error} if file path is invalid
     *
     * @memberOf File
     */
    deleteSync() {
        try {
            fs.unlinkSync( this.path )
        } catch( error ) {
            throw new Error( `Error when trying to delete synchronously the file (${this.path}).\n${error.message}` )
        }
    }

    /**
     * rename - rename the file
     *
     * @param {string} newName
     * @returns {Promise}
     *
     * @memberOf File
     */
    rename( newName ) {
        return new Promise( ( resolve, reject ) => {
            const newPath = `${this.directory.path}/${newName}`

            fs.rename( this.path, newPath, error => error ? reject( error ) : resolve() )

            this.loadPathInfo( newPath )
        })
    }

    /**
     * renameSync - rename the file synchronously
     *
     * @param {string} newName
     * @returns {Object}
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
        } catch( error ) {
            throw new Error( `Error when trying to rename synchronously the file (${this.path}).\n${error.message}` )
        }
    }

    /**
     * move - move the file at indicated path
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
     * moveSync - move the file at indicated path synchronously
     *
     * @param {Object} newPath
     * @returns {Object}
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
     *
     * @returns {File}
     *
     * @memberOf File
     */
    setContent( newContent ) {
        this.content = newContent

        return this
    }

    /**
     * path - get the file path
     *
     * @memberOf File
     */
    get path() {
        return this._path
    }

    /**
     * path - set the file path
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
     * content - get the file content
     *
     * @memberOf File
     */
    get content() {
        return this._content
    }

    /**
     * content - set the file content
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
