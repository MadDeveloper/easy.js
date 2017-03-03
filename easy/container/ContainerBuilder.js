/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Container = require( './Container' )
const Configurable = require( '../interfaces/Configurable' )
const Configuration = require( '../core/Configuration' )
const { isPlainObject } = require( 'lodash' )

/**
 * @class ContainerBuilder
 */
class ContainerBuilder extends Configurable {
    /**
     * @constructor
     */
    constructor( application, dependenciesMapping ) {
        super()

        this._application = application
        this._dependenciesMapping = dependenciesMapping || Configuration.load( 'services' )
        this._container = new Container()
        this._configurations = {}
        this._cached = new Map()
    }

    /**
     * Configure container builder
     *
     * @param  {object} options = {}
     * @returns {ContainerBuilder}
     */
    configure( options = {}) {
        this.configurations.includeComponents = options.includeComponents || false

        return this
    }

    /**
     * Add dependency manually
     *
     * @param {string} name
     * @param {object} dependency
     *
     * @returns {ContainerBuilder}
     */
    addToBuild( name, dependency ) {
        this.cache( name, dependency )
        this.container.register( name, dependency )

        return this
    }

    /**
     * Build container and return it
     *
     * @returns {Container}
     */
    build() {
        if ( this.configurations.includeComponents ) {
            this.dependenciesMapping = Object.assign( this.dependenciesMapping, require( './components' ) )
        }

        this.registerDependencies()

        return this.container
    }

    /**
     * Preload all dependencies
     */
    registerDependencies() {
        Reflect.ownKeys( this.dependenciesMapping ).forEach( name => {
			const dependency = this.load( name, this.dependenciesMapping[ name ].path, name.includes( 'component.' ) )

			this.container.register( name, dependency )
		})
    }

    /**
     * Inject dependencies into the dependency requested
     *
     * @param  {string} dependency
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
            if ( 'easy.application' === dependencyName ) {
                dependencies.push( this._application )
            } else if ( 'easy.container' === dependencyName ) {
                dependencies.push( this.container )
            } else {
                dependencies.push(
                    this.load( dependencyName,
                    this.dependenciesMapping[ dependencyName ].path,
                    dependencyName.includes( 'component.' ) ) )
            }
        })

        return dependencies
    }

    /**
     * Load a new instance of the dependency
     *
     * @param {string} name
     * @param {string} path
     * @param {boolean} [isComponent=false]
     * @returns {Object}
     *
     * @throws {ReferenceError} if the dependency file path is not found
     */
    load( name, path, isComponent = false ) {
        if ( this.isLoaded( name ) ) {
            return this.getLoaded( name )
        }

        const dependencyFilePath = `${isComponent ? '' : `${this._application.kernel.path.root}/src/`}${this.dependenciesMapping[ name ].path}`
		let dependencyClass

        try {
			dependencyClass = require( dependencyFilePath )
        } catch ( error ) {
            throw new ReferenceError( `Impossible to load dependency ${name} (${dependencyFilePath})\n${error.message}` )
        }

		return this.cache( name, new dependencyClass( ...this.injectDependencies( name ) ) )
    }

    /**
     * Check if the dependency is loaded
     *
     * @param {name} name
     * @returns {boolean}
     */
    isLoaded( name ) {
        return this.cached.has( name )
    }

    /**
     * Get already loaded dependency
     *
     * @param  {string} name
     * @returns {object}
     */
    getLoaded( name ) {
        return this.cached.get( name )
    }

    /**
     * Cache a dependency
     *
     * @param  {string} name
     * @param  {object} dependency
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
