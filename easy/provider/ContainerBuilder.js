const Container = require( './Container' )
const Configurable = require( '../interfaces/Configurable' )
const ConfigLoader = require( '../core/ConfigLoader' )
const Console = require( '../core/Console' )
const { assignIn } = require( 'lodash' )

/**
 * @class ContainerBuilder
 */
class ContainerBuilder extends Configurable {
    /**
     * constructor
     */
    constructor( application ) {
        super()

        this.application = application
        this.dependenciesMapping = ConfigLoader.loadFromGlobal( 'services' )
        this.container = new Container()
        this.configurations = {}
        this.path = application.kernel.path
        this.cached = {}
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
        Object.keys( this.dependenciesMapping ).forEach( name => {
            this.container.register( name, this.load( name, this.dependenciesMapping[ name ].path, -1 !== name.indexOf( 'component.' ) ) )
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

        if ( !dependencyMapping.hasOwnProperty( 'dependencies' ) ) {
            return []
        }

        const requestedDependencies = dependencyMapping.dependencies

        if ( 0 === requestedDependencies.length ) {
            return []
        }

        let dependencies = []

        requestedDependencies.forEach( dependencyName => {
            if ( 'easy.application' === dependencyName ) {
                dependencies.push( this.application )
            } else if ( 'easy.container' === dependencyName ) {
                dependencies.push( this.container )
            }else {
                dependencies.push( this.load( dependencyName, this.dependenciesMapping[ dependencyName ].path, -1 !== dependencyName.indexOf( 'component.' ) ) )
            }
        })

        return dependencies
    }

    /**
     * load - load a new instance of a dependency
     *
     * @param  {string} name
     * @param  {string} path
     */
    load( name, path, isComponent = false ) {
        if ( this.isLoaded( name ) ) {
            return this.getLoaded( name )
        }

        const dependencyFilePath = `${isComponent ? 'easy' : this.path.src}/${this.dependenciesMapping[ name ].path}`

        try {
            const dependencyClass = require( dependencyFilePath )

            return this.cache( name, new dependencyClass( ...this.injectDependencies( name ) ) )
        } catch ( error ) {
            Console.error({
                title: "Impossible to load dependency",
                message: `Path: ${dependencyFilePath}\n${error}`,
                type: 'error',
                exit: 1
            })
        }
    }

    /**
     * isLoaded - check if dependency is loaded
     *
     * @param  {name} name
     * @returns {boolean}
     */
    isLoaded( name ) {
        return this.cached.hasOwnProperty( name )
    }

    /**
     * getLoaded - get already loaded dependency
     *
     * @param  {string} name
     * @returns {object}
     */
    getLoaded( name ) {
        return this.cached[ name ]
    }

    /**
     * cache - cache a dependency
     *
     * @param  {string} name
     * @param  {object} dependency
     * @returns {object}
     */
    cache( name, dependency ) {
        this.cached[ name ] = dependency

        return dependency
    }
}

module.exports = ContainerBuilder