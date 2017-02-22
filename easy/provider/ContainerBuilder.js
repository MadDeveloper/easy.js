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
const ConfigLoader = require( '../core/ConfigLoader' )
const { assignIn } = require( 'lodash' )

/**
 * @class ContainerBuilder
 */
class ContainerBuilder extends Configurable {
    /**
     * constructor
     */
    constructor( application, dependenciesMapping ) {
        super()

        this.application = application
        this.dependenciesMapping = dependenciesMapping || ConfigLoader.loadFromGlobal( 'services' )
        this.container = new Container()
        this.configurations = {}
        this.cached = new Map()
    }

    /**
     * configure - configure container builder
     *
     * @param  {object} options = {}
     * @returns {ContainerBuilder}
     */
    configure( options = {}) {
        this.configurations.includeComponents = options.includeComponents || false

        return this
    }

    /**
     * addToBuild - add dependency manually
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
     * build - build container and return it
     *
     * @returns {Container}
     */
    build() {
        if ( this.configurations.includeComponents ) {
            this.dependenciesMapping = assignIn( this.dependenciesMapping, require( './components' ) )
        }

        this.registerDependencies()

        return this.container
    }

    /**
     * registerDependencies - preload all dependencies
     */
    registerDependencies() {
        Reflect
            .ownKeys( this.dependenciesMapping )
            .forEach( name => {
                const dependency = this.load( name, this.dependenciesMapping[ name ].path, name.includes( 'component.' ) )
                this.container.register( name, dependency )
            })
    }

    /**
     * injectDependencies - inject dependencies into the dependency requested
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

        let dependencies = new Set()

        requestedDependencies.forEach( dependencyName => {
            if ( 'easy.application' === dependencyName ) {
                dependencies.add( this.application )
            } else if ( 'easy.container' === dependencyName ) {
                dependencies.add( this.container )
            } else {
                dependencies.add(
                    this.load( dependencyName,
                    this.dependenciesMapping[ dependencyName ].path,
                    dependencyName.includes( 'component.' ) ) )
            }
        })

        return dependencies
    }

    /**
     * load - load a new instance of a dependency
     *
     * @param {string} name
     * @param {string} path
     * @param {boolean} isComponent=false
     *
     * @returns {Object}
     */
    load( name, path, isComponent = false ) {
        if ( this.isLoaded( name ) ) {
            return this.getLoaded( name )
        }

        const dependencyFilePath = `${isComponent ? '' : 'src/'}${this.dependenciesMapping[ name ].path}`

        try {
            const dependencyClass = require( dependencyFilePath )

            return this.cache( name, new dependencyClass( ...this.injectDependencies( name ) ) )
        } catch ( error ) {
            throw new ReferenceError( `Impossible to load dependency ${name} (${dependencyFilePath})` )
        }
    }

    /**
     * isLoaded - check if dependency is loaded
     *
     * @param {name} name
     * @returns {boolean}
     */
    isLoaded( name ) {
        return this.cached.has( name )
    }

    /**
     * getLoaded - get already loaded dependency
     *
     * @param  {string} name
     * @returns {object}
     */
    getLoaded( name ) {
        return this.cached.get( name )
    }

    /**
     * cache - cache a dependency
     *
     * @param  {string} name
     * @param  {object} dependency
     * @returns {object}
     */
    cache( name, dependency ) {
        this.cached.set( name, dependency )

        return dependency
    }
}

module.exports = ContainerBuilder
