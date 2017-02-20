/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const path = require( 'path' )
const ConfigLoader = require( './ConfigLoader' )

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
     * @param {string} appRootPath
     */
    init( appRootPath ) {
        /*
         * paths
         */
        this.path.root = path.resolve( appRootPath )
        this.path.bin = `${this.path.root}/bin`
        this.path.src = `${this.path.root}/src`
        this.path.bundles = `${this.path.src}/bundles`
        this.path.config = `${this.path.src}/config`
        this.path.services = `${this.path.src}/services`
    }

    /**
     * Load all bundles
     *
     * @memberOf Kernel
     */
    loadBundles() {
        const bundles = ConfigLoader.loadFromGlobal( 'bundles/activated' )

        this.config.forEach( bundle => this.parseBundleRoutes( bundle ) )
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
