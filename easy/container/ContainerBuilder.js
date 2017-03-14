/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Container = require( './Container' )
const { isPlainObject } = require( 'lodash' )
const path = require( 'path' )

/**
 * @class ContainerBuilder
 */
class ContainerBuilder {
    /**
     * @constructor
	 * @param {Object} dependenciesMapping
	 * @param {Object} configurations
     */
    constructor( dependenciesMapping, configurations ) {
        this._dependenciesMapping = dependenciesMapping
        this._container = new Container()
        this._configurations = configurations
        this._cached = new Map()
    }

    /**
     * Add dependency manually
     *
     * @param {string} name
     * @param {object} dependency
     *
     * @returns {ContainerBuilder}
     */
    add( name, dependency ) {
        this.cache( name, dependency )
        this.container.set( name, dependency )

        return this
    }

    /**
     * Build container and return it
     *
     * @returns {Container}
     */
    build() {
        if ( this.configurations.components ) {
            this.dependenciesMapping = Object.assign( this.dependenciesMapping, require( this.configurations.components ) )
        }

        this.registerDependencies()

        return this.container
    }

    /**
     * Preload all dependencies
     */
    registerDependencies() {
        Reflect.ownKeys( this.dependenciesMapping ).forEach( name => {
			const dependency = this.load( name, name.includes( 'component.' ) )

			this.container.set( name, dependency )
		})
    }

    /**
     * Inject dependencies into the dependency requested
     *
     * @param {string} dependency
     * @returns {Array}
     */
    injectDependencies( dependency ) {
        const dependencyMapping = this.dependenciesMapping[ dependency ]

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
                dependencies.push( this.load( dependencyName, dependencyName.includes( 'component.' ) ) )
            }
        })

        return dependencies
    }

    /**
     * Load a new instance of the dependency
     *
     * @param {string} name
     * @param {boolean} [isComponent=false]
     * @returns {Object}
     *
     * @throws {ReferenceError} if the dependency file path is not found
     */
    load( name, isComponent = false ) {
        if ( this.loaded( name ) ) {
            return this.dependency( name )
        }

		let dependencyFilePath = this.dependenciesMapping[ name ].path
		let dependencyClass

        try {
			dependencyClass = require( dependencyFilePath )

			return this.cache( name, new dependencyClass( ...this.injectDependencies( name ) ) )
        } catch ( error ) {
            throw new ReferenceError( `Impossible to load dependency ${name} (${dependencyFilePath})\n${error}` )
        }
    }

    /**
     * Check if the dependency is loaded
     *
     * @param {name} name
     * @returns {boolean}
     */
    loaded( name ) {
        return this.cached.has( name )
    }

    /**
     * Get already loaded dependency
     *
     * @param {string} name
     * @returns {object}
     */
    dependency( name ) {
        return this.cached.get( name )
    }

    /**
     * Cache a dependency
     *
     * @param {string} name
     * @param {object} dependency
     * @returns {object}
     */
    cache( name, dependency ) {
        this.cached.set( name, dependency )

        return dependency
    }

	/**
	 * Get dependencies mapping
	 *
	 * @readonly
	 *
	 * @memberOf ContainerBuilder
	 */
	get dependenciesMapping() {
		return this._dependenciesMapping
	}

	/**
	 * Set dependencies mapping
	 *
	 * @memberOf ContainerBuilder
	 */
	set dependenciesMapping( value ) {
		if ( isPlainObject( value ) ) {
			this._dependenciesMapping = value
		}
	}

	/**
	 * Get container
	 *
	 * @readonly
	 *
	 * @memberOf ContainerBuilder
	 */
	get container() {
		return this._container
	}

	/**
	 * Get ContainerBuilder configurations
	 *
	 * @readonly
	 *
	 * @memberOf ContainerBuilder
	 */
	get configurations() {
		return this._configurations
	}

	/**
	 * Get cached dependencies
	 *
	 * @readonly
	 *
	 * @memberOf ContainerBuilder
	 */
	get cached() {
		return this._cached
	}
}

module.exports = ContainerBuilder
