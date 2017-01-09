/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const path = require( 'path' )

/**
 * @class Kernel
 */
class Kernel {
    /**
     * @constructor
     */
    constructor() {
        this._path = {}
    }

    /**
     * init - init kernel
     *
     * @param {string} rootPath
     */
    init( rootPath ) {
        /*
         * paths
         */
        this.path.root = path.resolve( rootPath )
        this.path.bin = `${this.path.root}/bin`
        this.path.src = `${this.path.root}/src`
        this.path.bundles = `${this.path.src}/bundles`
        this.path.config = `${this.path.src}/config`
        this.path.services = `${this.path.src}/services`
    }

    /**
     * get - all paths
     *
     * @returns {object}
     */
    get path() {
        return this._path
    }
}

module.exports = Kernel
