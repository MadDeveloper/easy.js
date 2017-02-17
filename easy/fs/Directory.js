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
            try {
                fs.lstat( this.path, ( error, stat ) => {
                    if ( error || !stat.isDirectory() ) {
                        resolve( false )
                    }

                    resolve( true )
                })
            } catch ( error ) {
                resolve( false )
            }
        })
    }

    /**
     * exists - check, in synchronous maner, if path is a directory
     *
     * @returns {boolean}
     */
    existsSync() {
        try {
            return fs.lstatSync( this.path ).isDirectory()
        } catch( error ) {
            return false
        }
    }

    /**
     * create - create directory at indicated path
     *
     * @param {object} options = { mode: 755 }
     *
     * @returns {Promise}
     */
    create( options = { mode: 755 }) {
        return new Promise( ( resolve, reject ) => {
            if ( 'mode' in options ) {
                options.mode = parseInt( options.mode, 8 )
            }

            fs.mkdir( this.path, options, error => error ? reject( error ) : resolve() )
        })
    }

    /**
     * createSync - create, in synchronous maner, the directory at indicated path
     *
     * @param {object} options = { mode: 755 }
     *
     * @returns {boolean}
     */
    createSync( options = { mode: 755 }) {
        let results = { success: false, error: null }

        try {
            if ( 'mode' in options ) {
                options.mode = parseInt( options.mode, 8 )
            }

            fs.mkdirSync( this.path, options )
            results.success = true
        } catch ( error ) {
            results.error = error
        } finally {
            return results
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
        return new Promise( ( resolve, reject ) => {
            fs.rmdir( this.path, error => error ? reject( error ) : resolve() )
        })
    }

    /**
     * deleteSync - Delete the directory synchronously
     *
     * @returns {Object}
     *
     * @memberOf Directory
     */
    deleteSync() {
        let results = { success: false, error: null }

        try {
            fs.rmdirSync( this.path )
            results.success = true
        } catch ( error ) {
            results.error = error
        } finally {
            return results
        }
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
            fs.rename( this.path, `${dir}/${newName}`, error => error ? reject( error ) : resolve() )

            this.loadPathInfo( newPath )
        })
    }

    /**
     * renameSync - rename the directory synchronously
     *
     * @param {string} newName
     * @returns {Object}
     *
     * @memberOf Directory
     */
    renameSync( newName ) {
        let results = { success: false, error: null }

        try {
           fs.renameSync( this.path, `${dir}/${newName}` )
            results.success = true
        } catch ( error ) {
            results.error = error
        } finally {
            return results
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
     * @returns {Object}
     *
     * @memberOf Directory
     */
    moveSync( newPath ) {
        return this.renameSync( path.resolve( this.path, newPath ) )
    }

    /**
     * path - get the directory path
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
