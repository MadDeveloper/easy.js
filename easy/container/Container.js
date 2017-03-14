/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * @class Container
 */
class Container {
    /**
     * @constructor
     */
    constructor() {
        this._shared = new Map()
    }

    /**
     * Set a dependency
     *
     * @param {string} name
     * @param {any} dependency
     * @returns {Container}
     */
    set( name, dependency ) {
        this.shared.set( name, dependency )

        return this
    }

    /**
     * Get a dependency by name
     *
     * @param {string} name
     * @returns {any}
     */
    get( name ) {
        return this.shared.get( name )
    }

    /**
     * Get all dependencies loaded
     *
     * @returns {Map}
     */
    get shared() {
        return this._shared
    }
}

module.exports = Container
