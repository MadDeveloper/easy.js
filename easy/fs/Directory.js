const fs = require( 'fs' )
const Console = require( '../core/Console' )

/**
 * @class Directory
 */
class Directory {
    /**
     * @constructor
     *
     * @param {string} path=''
     *
     * @returns {Directory}
     */
    constructor( path = '' ) {
        this.path = path
    }

    /**
     * exists - check if path is a directory
     *
     * @returns {boolean}
     */
    exists() {
        try {
            const statInfo = fs.lstatSync( this.path )

            return statInfo.isDirectory()
        } catch( error ) {
            return false
        }
    }

    /**
     * create - create directory at indicated path
     *
     * @param {number} mode = 755
     *
     * @returns {boolean}
     */
    create( mode = 755 ) {
        try {
            fs.mkdirSync( this.path, parseInt( mode, 8 ) )

            return true
        } catch ( error ) {
            Console.error({
                title: `Impossible to create directory : ${this.path}`,
                message: error.toString()
            })
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
