const Container         = require( 'easy/container/Container' )
const Configurable      = require( 'easy/interfaces/Configurable' )
const ConfigLoader      = require( 'easy/core/ConfigLoader' )
const Console           = require( 'easy/core/Console' )
const { assignIn }      = require( 'lodash' )

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
        this.container = null
        this.configurations = {}
        this.path = application.kernel.path
        this.cached = {}
    }

    /**
     * configure - description
     *
     * @param  {type} options = {} description
     * @returns {type}              description
     */
    configure( options = {} ) {
        this.configurations.includeComponents = options.includeComponents || false

        return this
    }

    /**
     * build - description
     *
     * @returns {type}  description
     */
    build() {
        this.container = new Container()

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
        let dependencies = []
        const requestedDependencies = this.dependenciesMapping[ dependency ].dependencies

        if ( requestedDependencies.length > 0 ) {
            requestedDependencies.forEach( dependencyName => {
                if ( 'easy.application' === dependencyName ) {
                    dependencies.push( this.application )
                } else {
                    dependencies.push( this.load( dependencyName, this.dependenciesMapping[ dependencyName ].path, -1 !== dependencyName.indexOf( 'component.' ) ) )
                }
            })
        }

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
     * isLoaded - description
     *
     * @param  {type} name description
     * @returns {type}      description
     */
    isLoaded( name ) {
        return this.cached.hasOwnProperty( name )
    }

    /**
     * getLoaded - description
     *
     * @param  {type} name description
     * @returns {type}      description
     */
    getLoaded( name ) {
        return this.cached[ name ]
    }

    /**
     * cache - description
     *
     * @param  {type} name       description
     * @param  {type} dependency description
     * @returns {type}            description
     */
    cache( name, dependency ) {
        this.cached[ name ] = dependency

        return dependency
    }
}

module.exports = ContainerBuilder
