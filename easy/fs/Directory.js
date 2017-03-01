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
 * @class Directory
 */
class Directory extends Document {
    /**
     * @constructor
     *
     * @param {string} directoryPath=''
     */
    constructor( directoryPath = '' ) {
        super()

        this.loadPathInfo( directoryPath )
    }

    /**
     * loadPathInfo - load all infos relative to the directory path
     *
     * @param {string} directoryPath
     *
     * @memberOf Directory
     */
    loadPathInfo( directoryPath ) {
        const { root, dir, base, ext, name } = path.parse( directoryPath )

        this.root = root
        this.dir = dir
        this.base = base
        this.ext = ext
        this.name = name
        this.path = `${dir}/${base}`
    }

    /**
     * exists - check if path is a directory
     *
     * @returns {Promise}
     */
    exists() {
        return new Promise( ( resolve, reject ) => {
            fs.lstat( this.path, ( error, stat ) => {
                if ( error || !stat.isDirectory() ) {
                    resolve( false )
                }

                resolve( true )
            })
        })
    }

    /**
     * exists - check, in synchronous maner, if path is a directory
     *
     * @returns {boolean}
     *
     * @throws {Error} if file path is invalid
     */
    existsSync() {
        try {
            return fs.lstatSync( this.path ).isDirectory()
        } catch( error ) {
            throw new Error( `Error when trying to check synchronously the existance of the directory (${this.path}).\n${error.message}` )
        }
    }

    /**
     * read directory documents
     *
     * @param {Object} options={encoding: 'utf8'}
     * @returns {Promise}
     */
    read( options = { encoding: 'utf8' }) {
        return new Promise( ( resolve, reject ) => {
            fs.readdir( this.path, options, async ( error, documents ) => {
                if ( error ) {
                    reject( `Error when trying to read the directory (${this.path}).\n${error.message}` )
                } else {
                    resolve( documents )
                }
            })
        })
    }

    /**
     * read directory documents synchronously
     *
     * @param {object} options={encoding: 'utf8'}
     * @returns {Array}
     *
     * @throws {Error} if directory path is invalid
     */
    readSync( options = { encoding: 'utf8' }) {
        try {
            return fs.readdirSync( this.path, options )
        } catch( error ) {
            throw new Error( `Error when trying to read synchronously the directory (${this.path}).\n${error.message}` )
        }
    }

    /**
     * create - create directory at indicated path
     *
     * @param {object} options = { mode: 755 }
     * @returns {Promise}
     */
    create( options = { mode: 755 }) {
        return new Promise( ( resolve, reject ) => {
            if ( 'mode' in options ) {
                options.mode = parseInt( options.mode, 8 )
            }

            fs.mkdir( this.path, options, error => {
                if ( error ) {
                    reject( `Error when trying to create the directory (${this.path}).\n${error.message}` )
                } else {
                    resolve()
                }
            })
        })
    }

    /**
     * createSync - create, in synchronous maner, the directory at indicated path
     *
     * @param {object} options = { mode: 755 }
     * @returns {boolean}
     *
     * @throws {Error} if path is invalid
     */
    createSync( options = { mode: 755 }) {
        let results = { success: false, error: null }

        try {
            if ( 'mode' in options ) {
                options.mode = parseInt( options.mode, 8 )
            }

            fs.mkdirSync( this.path, options )

            return true
        } catch( error ) {
            throw new Error( `Error when trying to create synchronously the directory (${this.path}).\n${error.message}` )
        }
    }

    /**
     * delete - Delete the directory
     *
     * @returns {Promise}
     *
     * @memberOf Directory
     */
    delete() {
        return new Promise( async ( resolve, reject ) => {
            try {
                this._deleteContainedDocuments()

                fs.rmdir( this.path, error => {
                    if ( error ) {
                        reject( `Error when trying to delete the directory (${this.path}).\n${error.message}` )
                    } else {
                        resolve()
                    }
                })
            } catch ( error ) {
                reject( `Error when trying to delete directory (${this.path}).\n${error.message}` )
            }
        })
    }

    /**
     * deleteSync - Delete the directory synchronously
     *
     * @returns {boolean}
     *
     * @throws {Error} if path is invalid
     *
     * @memberOf Directory
     */
    deleteSync() {
        try {
            this._deleteContainedDocuments()
            fs.rmdirSync( this.path )

            return true
        } catch( error ) {
            throw new Error( `Error when trying to delete synchronously the directory (${this.path}).\n${error.message}` )
        }
    }

    /**
     * Delete all documents found in the directory synchronously
     *
     * @returns {boolean}
     *
     * @private
     *
     * @memberOf Directory
     */
    _deleteContainedDocuments() {
        const documents = this.readSync()

        documents.forEach( document => {
            const documentPath = `${this.path}/${document}`

            if ( fs.lstatSync( documentPath ).isDirectory() ) {
                const directory = new Directory( documentPath )

                directory.deleteSync()
            } else {
                fs.unlinkSync( documentPath )
            }
        })

        return true
    }

    /**
     * rename - rename the directory
     *
     * @param {string} newName
     * @returns {Promise}
     *
     * @memberOf Directory
     */
    rename( newName ) {
        return new Promise( ( resolve, reject ) => {
            fs.rename( this.path, `${dir}/${newName}`, error => {
                if ( error ) {
                    reject( `Error when trying to rename the directory (${this.path}).\n${error.message}` )
                } else {
                    resolve()
                }
            })

            this.loadPathInfo( newPath )
        })
    }

    /**
     * renameSync - rename the directory synchronously
     *
     * @param {string} newName
     * @returns {boolean}
     *
     * @throws {Error} if path is invalid
     *
     * @memberOf Directory
     */
    renameSync( newName ) {
        try {
           fs.renameSync( this.path, `${dir}/${newName}` )

           return true
        } catch( error ) {
            throw new Error( `Error when trying to rename synchronously the directory (${this.path}).\n${error.message}` )
        }
    }

    /**
     * move - move the directory at indicated path
     *
     * @param {Object} newPath
     * @returns {Promise}
     *
     * @memberOf Directory
     */
    move( newPath ) {
        return this.rename( path.resolve( this.path, newPath ) )
    }

    /**
     * moveSync - move the directory at indicated path synchronously
     *
     * @param {Object} newPath
     * @returns {boolean}
     *
     * @throws {Error} if path is invalid
     *
     * @memberOf Directory
     */
    moveSync( newPath ) {
        return this.renameSync( path.resolve( this.path, newPath ) )
    }

    /**
     * path - get the directory path
     *
     * @returns {string}
     *
     * @memberOf Directory
     */
    get path() {
        return this._path
    }

    /**
     * path - set the directory path
     *
     * @param {string} newPath
     *
     * @memberOf Directory
     */
    set path( newPath = '' ) {
        if ( 'string' === typeof newPath ) {
            this._path = path.resolve( newPath )
        }
    }
}

module.exports = Directory
