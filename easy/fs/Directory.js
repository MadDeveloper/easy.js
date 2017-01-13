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
const Console = require( '../core/Console' )

/**
 * @class Directory
 */
class Directory {
    /**
     * @constructor
     *
     * @param {string} directoryPath=''
     *
     * @returns {Directory}
     */
    constructor( directoryPath = '' ) {
        this.path = path.resolve( directoryPath )
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
                    reject( error )
                }

                resolve()
            })
        })
    }/**
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
     * @param {number} mode = 755
     *
     * @returns {Promise}
     */
    create( mode = 755 ) {
        fs.mkdir( this.path, parseInt( mode, 8 ), error => {
            error ? reject( error ) : resolve()
        })
    }

    /**
     * createSync - create, in synchronous maner, directory at indicated path
     *
     * @param {number} mode = 755
     *
     * @returns {boolean}
     */
    createSync( mode = 755 ) {
        try {
            fs.mkdirSync( this.path, parseInt( mode, 8 ) )

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

module.exports = Directory
