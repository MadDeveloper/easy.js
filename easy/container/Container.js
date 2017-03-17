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
     * Set a provider
     *
     * @param {string} name
     * @param {any} provider
     * @param {Object|string[]} options
     * @returns {Container}
     */
    register( name, provider, options ) {
        this.shared.set( name, provider )

        return this
    }

    /**
     * Get a provider by name
     *
     * @param {string} name
     * @returns {any}
     */
    get( name ) {
        return this.shared.get( name )
    }

    /**
     * Inject dependencies into the dependency requested
     *
     * @param {string} dependency
     * @returns {Array}
     */
    _injectDependencies( dependency ) {
        const dependencyMapping = this._providerDependencies[ dependency ]

        if ( !( 'dependencies' in dependencyMapping ) ) {
            return []
        }

        const requestedDependencies = dependencyMapping.dependencies

        if ( 0 === requestedDependencies.length ) {
            return []
        }

        const dependencies = []

        requestedDependencies.forEach( dependencyName => {
            if ( 'container' === dependencyName ) {
                dependencies.push( this.container )
            } else {
                dependencies.push( this.load( dependencyName ) )
            }
        })

        return dependencies
    }

    /**
     * Get all providers shared
     *
     * @returns {Map}
     */
    get shared() {
        return this._shared
    }
}

module.exports = Container
