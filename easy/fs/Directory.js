const fs = require( 'fs' )
const Console = require( 'easy/core/Console' )

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
     * delete - Description
     *
     * @returns {type} Description
     */
    delete() {
        throw new Error( 'Not implemented yet' )
    }

    /**
     * rename - Description
     *
     * @returns {type} Description
     */
    rename() {
        throw new Error( 'Not implemented yet' )
    }

    /**
     * move - Description
     *
     * @returns {type} Description
     */
    move() {
        throw new Error( 'Not implemented yet' )
    }
}

module.exports = Directory
