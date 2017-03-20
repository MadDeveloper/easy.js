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
        this._stored = new Map()
    }

    /**
     * Register a dependency
     *
     * @param {string} name
     * @param {class} dependency
     * @param {Object|string[]} [dependencies=[]]
     * @param {Object} [metadata={ shared: true }]
     * @returns {Container}
     */
    register( name, dependency, dependencies = [], metadata = { shared: true }) {
        metadata.loaded = false
        metadata.shared = metadata.shared || true
        this.stored.set( name, { dependency, dependencies, metadata })

        return this
    }

    /**
     * Force a dependency to be set
     *
     * @param {string} name
     * @param {any} dependency
     * @returns {Container}
     *
     * @memberOf Container
     */
    set( name, dependency ) {
        const stored = {
            dependency,
            metadata: {
                loaded: true
            }
        }

        this.stored.set( name, stored )

        return this
    }

    /**
     * Get a dependency by name
     *
     * @param {string} name
     * @returns {Object}
     */
    get( name ) {
        if ( !this.registered( name ) ) {
            return undefined
        }

        const stored = this.stored.get( name )
        let dependency = stored.dependency
        let dependencyInstance = dependency
        const metadata = stored.metadata
        const dependencies = stored.dependencies

        if ( false === stored.metadata.shared || false === stored.metadata.loaded ) {
            dependencyInstance = new dependency( ...this._dependencies( dependencies ) )

            if ( stored.metadata.shared ) {
                this._load( name, dependencyInstance )
            }
        }

        return dependencyInstance
    }

    /**
     * Check if the dependency is already registered
     *
     * @param {name} name
     * @returns {boolean}
     */
    registered( name ) {
        return this.stored.has( name )
    }

    /**
     * Check if dependency is loaded
     *
     * @param {string} name
     * @returns {boolean}
     *
     * @memberOf Container
     */
    loaded( name ) {
        return this.stored.get( name ).metadata.loaded
    }

    /**
     * Define dependency as loaded
     *
     * @param {string} name
     * @param {Object} dependency
     *
     * @private
     *
     * @memberOf Container
     */
    _load( name, dependency ) {
        const stored = this.stored.get( name )

        stored.metadata.loaded = true
        stored.dependency = dependency

        this.stored.set( name, stored )
    }

    /**
     * Get dependencies
     *
     * @param {Object[]} dependencies
     * @returns {Object[]}
     */
    _dependencies( dependencies ) {
        const dependenciesInstances = []

        dependencies.forEach( dependency => {
            if ( 'container' === dependency ) {
                dependenciesInstances.push( this )
            } else {
                dependenciesInstances.push( this.get( dependency ) )
            }
        })

        return dependenciesInstances
    }

    /**
     * Get all dependencies stored
     *
     * @returns {Map}
     */
    get stored() {
        return this._stored
    }
}

module.exports = Container
