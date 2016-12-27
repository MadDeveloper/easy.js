const fs                = require( 'fs' )
const path              = require( 'path' )
const Console           = require( './Console' )
const ConfigLoader      = require( './ConfigLoader' )
const servicesMapping   = ConfigLoader.loadFromGlobal( 'services' )

/**
 * @class Container
 */
class Container {
    /**
     * @constructor
     * @param  {Object} path
     */
    constructor( application, path ) {
        this.application = application
        this.path = path

        /*
         * Dependencies shared
         */
        this._componentsLoaded  = {}
        this._shared            = {}

        this._servicesDirectoryPath = path.services

        this._componentsMapping = {
            'router': `${path.vendor.easy}/core/Router`,
            'bundlemanager':   `${path.vendor.easy}/core/BundleManager`,
            'entitymanager': `${path.vendor.easy}/database/EntityManager`,
            'database': `${path.vendor.easy}/database/Database`,
            'logger': `${path.vendor.easy}/log/Logger`,
            'logfilemanager':   `${path.vendor.easy}/log/LogFileManager`,
            'logwriter': `${path.vendor.easy}/log/LogWriter`
        }
        this._servicesMapping = servicesMapping
    }

    /**
     * loadComponent - load specific component
     *
     * @param  {string} name
     * @param  {boolean} clearCache = false
     */
    loadComponent( name, clearCache = false ) {
        if ( "undefined" === typeof this.componentsLoaded[ name ] ) {
            if ( this.componentsMapping.hasOwnProperty( name ) ) {
                const pathComponent = `${this.componentsMapping[ name ]}.js`

                if ( fs.statSync( pathComponent ).isFile() ) {
                    if ( clearCache ) {
                        delete require.cache[ require.resolve( pathComponent ) ]
                    }

                    const component = require( pathComponent )
                    this.componentsLoaded[ name ] = new component( this )
                }
            }
        }
    }

    /**
     * loadComponents - load all components
     */
    loadComponents() {
        for ( let componentName in this.componentsMapping ) {
            if ( this.componentsMapping.hasOwnProperty( componentName ) ) {
                this.loadComponent( componentName )
            }
        }
    }

    /**
     * reloadComponent - reload component into container
     *
     * @param  {string} name
     * @returns {Component|undefined}
     */
    reloadComponent( name ) {
        name = name.toLowerCase()

        if ( this.isComponentMapped( name ) && this.isComponentLoaded( name ) ) {
            delete this.componentsLoaded[ name ]
            this.loadComponent( name, true )

            return this.componentsLoaded[ name ]
        } else {
            return undefined
        }
    }

    /**
     * getComponent - get component by name
     *
     * @param  {string} name
     * @returns {Component|undefined}
     */
    getComponent( name ) {
        name = name.toLowerCase()

        if ( this.isComponentMapped( name ) ) {
            if ( !this.isComponentLoaded( name ) ) {
                this.loadComponent( name )
            }

            return this.componentsLoaded[ name ]
        } else {
            return undefined
        }
    }

    /**
     * isComponentLoaded - check if component is already loaded
     *
     * @param  {string} name
     * @returns {boolean}
     */
    isComponentLoaded( name ) {
        return this.componentsLoaded.hasOwnProperty( name  )
    }

    /**
     * isComponentMapped - check if component is mapped
     *
     * @param  {string} name
     * @returns {boolean}
     */
    isComponentMapped( name ) {
        return this.componentsMapping.hasOwnProperty( name )
    }

    /**
     * isServiceMapped - check if service is mapped
     *
     * @param  {string} name
     * @returns {boolean}
     */
    isServiceMapped( name ) {
        return this.servicesMapping.hasOwnProperty( name )
    }

    /**
     * isServicesLoaded - check if service is already loaded
     *
     * @param  {string} name
     * @returns {boolean}
     */
    isServicesLoaded( name ) {
        return this.shared.hasOwnProperty( name )
    }

    /**
     * storeService - store a new instance of a service
     *
     * @param  {string} name
     * @param  {string} path
     */
    storeService( name, path ) {
        const serviceClass  = require( path )
        this.shared[ name ] = newService( this.injectDependencies( name ) )

        function newService() {
            arguments[ 0 ].unshift( undefined )
            return new ( serviceClass.bind.apply( serviceClass, arguments[ 0 ] ) )()
        }
    }

    /**
     * reloadService - reload a new instance of the service in the cache
     *
     * @param  {string} name
     */
    reloadService( name ) {
        if ( this.isServiceMapped( name ) && this.isServicesLoaded( name ) ) {
            delete this.shared[ name ]
            this.getService( name )
        }
    }

    /**
     * injectDependencies - inject dependencies into the service requested
     *
     * @param  {string} service
     * @returns {Array}
     */
    injectDependencies( service ) {
        let dependencies = []
        const serviceRequestedDependencies = this.servicesMapping[ service ].dependencies

        if ( serviceRequestedDependencies ) {
            let currentDependency
            let nameDependency

            for ( const dependency in serviceRequestedDependencies ) {
                if ( serviceRequestedDependencies.hasOwnProperty( dependency ) ) {
                    currentDependency = serviceRequestedDependencies[ dependency ]
                    nameDependency = currentDependency.substr( currentDependency.lastIndexOf( '.' ) + 1 )

                    if ( currentDependency.match( /^component\./ ) ) {
                        /*
                         * Component dependency
                         */
                        dependencies.push( this.getComponent( nameDependency ) )
                    } else {
                        /*
                         * Service dependency
                         */
                        dependencies.push( this.getService( currentDependency ) )
                    }
                }
            }
        }

        return dependencies
    }

    /**
     * getService - gets service by name
     *
     * @param  {string} name
     * @param  {boolean} clearCache = false
     * @returns {Service|undefined}
     */
    getService( name, clearCache = false ) {
        if ( this.isServiceMapped( name ) ) {
            if ( clearCache ) {
                this.reloadService( name )
            }

            if ( this.isServicesLoaded( name ) ) {
                return this.shared[ name ]
            }

            const serviceFilePath = `${this.servicesDirectoryPath}/${this.servicesMapping[ name ].path}.js`

            try {
                const statsServiceFile = fs.lstatSync( serviceFilePath )

                if ( statsServiceFile.isFile() ) {
                    this.storeService( name, serviceFilePath )

                    return this.shared[ name ]
                } else {
                    throw new Error()
                }
            } catch ( error ) {
                Console.error({
                    title: "Impossible to call service",
                    message: `Path: ${path.resolve( serviceFilePath )}\n${error}`,
                    type: 'error',
                    exit: 0
                })
            }
        } else {
            return undefined
        }
    }

    /**
     * loadServices - preload all services
     */
    loadServices() {
        Object.keys( this.servicesMapping ).forEach( service => this.getService( service ) )
    }

    /**
     * get - services directory path
     *
     * @returns {string}
     */
    get servicesDirectoryPath() {
        return this._servicesDirectoryPath
    }

    /**
     * get - all components loaded
     *
     * @returns {Object}
     */
    get componentsLoaded() {
        return this._componentsLoaded
    }

    /**
     * get - services loaded
     *
     * @returns {Object}
     */
    get shared() {
        return this._shared
    }

    /**
     * get - components mapping
     *
     * @returns {Object}
     */
    get componentsMapping() {
        return this._componentsMapping
    }

    /**
     * get - services mapping
     *
     * @returns {Object}
     */
    get servicesMapping() {
        return this._servicesMapping
    }
}

module.exports = Container
