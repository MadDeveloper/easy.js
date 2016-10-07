import fs                   from 'fs'
import path                 from 'path'
import servicesMapping      from './../../../config/services'
import librariesMapping     from './../../../config/lib'

/**
 * @class Container
 */
export default class Container {
    /**
     * @constructor
     * @param  {Kernel} kernel
     */
    constructor( kernel ) {
        this._kernel = kernel

        /*
         * Dependencies shared
         */
        this._componentsLoaded      = {}
        this._librariesLoaded       = {}
        this._shared                = {}

        this._servicesDirectoryPath = this._kernel.path.services
        this._librariesDirectoryPath = this._kernel.path.lib

        this._componentsMapping = {
            'bundlemanager': `${this._kernel.path.vendor.easy}/core/BundleManager`,
            'console': `${this._kernel.path.vendor.easy}/core/Console`,
            'factory': `${this._kernel.path.vendor.easy}/core/Factory`,
            'polyfills': `${this._kernel.path.vendor.easy}/core/Polyfills`,
            'router': `${this._kernel.path.vendor.easy}/core/Router`,
            'database': `${this._kernel.path.vendor.easy}/database/Database`,
            'entitymanager': `${this._kernel.path.vendor.easy}/database/EntityManager`,
            'logger': `${this._kernel.path.vendor.easy}/log/Logger`,
            'logfilemanager':   `${this._kernel.path.vendor.easy}/log/LogFileManager`,
            'logwriter': `${this._kernel.path.vendor.easy}/log/LogWriter`
        }
        this._librariesMapping = librariesMapping
        this._servicesMapping = servicesMapping
    }

    /*
     * Components
     */

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

                    const component = require( pathComponent ).default /* .default is needed to patch babel exports.default build, require doesn't work, import does */
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

    /*
     * Services
     */


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
        const serviceClass  = require( path ).default /* .default is needed to patch babel exports.default build, require doesn't work, import does */
        this.shared[ name ] = new serviceClass( this.injectDependencies( name ) )
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
     * @returns {Object}
     */
    injectDependencies( service ) {
        let dependencies = {}
        const serviceRequestedDependencies = this.servicesMapping[ service ].dependencies

        if ( serviceRequestedDependencies ) {
            let nameDependency
            let currentDependency

            for ( const dependency in serviceRequestedDependencies ) {
                if ( serviceRequestedDependencies.hasOwnProperty( dependency ) ) {
                    currentDependency = serviceRequestedDependencies[ dependency ]
                    nameDependency = currentDependency.substr( currentDependency.lastIndexOf( '.' ) + 1 )

                    if ( currentDependency.match( /^component\./ ) ) {
                        /*
                         * Component dependency
                         */
                        dependencies[ nameDependency ] = this.getComponent( nameDependency )
                    } else {
                        /*
                         * Service dependency
                         */
                        dependencies[ nameDependency ] = this.getService( currentDependency )
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

            const serviceFile = `${this.servicesDirectoryPath}/${this.servicesMapping[ name ].path}.js`

            try {
                const statsServiceFile = fs.lstatSync( serviceFile )

                if ( statsServiceFile.isFile() ) {
                    this.storeService( name, serviceFile )

                    return this.shared[ name ]
                } else {
                    throw new Error()
                }
            } catch ( error ) {
                this.getComponent( 'Console' ).error({
                    title: "Impossible to call service",
                    message: `Service ${name} not found, path: ${path.resolve( serviceFile )}\n${error}`,
                    type: 'error',
                    exit: 0
                })
            }
        } else {
            return undefined
        }
    }

    /*
     * Libraries
     */

    /**
     * isLibraryMapped - check if library is mapped
     *
     * @param  {string} name
     * @returns {boolean}
     */
    isLibraryMapped( name ) {
        return this.librariesMapping.hasOwnProperty( name )
    }

    /**
     * isLibraryLoaded - check if library is already loaded
     *
     * @param  {string} name
     * @returns {boolean}
     */
    isLibraryLoaded( name ) {
        return this.librariesLoaded.hasOwnProperty( name )
    }

    /**
     * reloadLibrary - reload a new instance of the service in the cache
     *
     * @param  {string} name description
     */
    reloadLibrary( name ) {
        if ( this.isLibraryMapped( name ) && this.isLibraryLoaded( name ) ) {
            delete this.librariesLoaded[ name ]
            this.getLibrary( name )
        }
    }

    /**
     * getLibrary - get library by name
     *
     * @param  {string} name
     * @returns {Object|undefined}
     */
    getLibrary( name ) {
        name = name.toLowerCase()

        if ( this.isLibraryMapped( name ) ) {
            if ( this.isLibraryLoaded( name ) ) {
                return this.librariesLoaded[ name ]
            }

            const pathLibrary   = `${this.librariesDirectoryPath}/${this.librariesMapping[ name ]}.js`
            const library       = require( pathLibrary )

            this.librariesLoaded[ name ] = library

            return this.librariesLoaded[ name ]
        } else {
            this.getComponent( 'Console' ).error({
                title: "Impossible to call library",
                message: `Library ${name} not found, path: ${path.resolve( `${this.librariesMapping[ name ]}.js` )}\n${error}`,
                type: 'error',
                exit: 0
            })

            return undefined
        }
    }

    /**
     * get - kernel instance
     *
     * @returns {Kernel}
     */
    get kernel() {
        return this._kernel
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
     * get - libraries directory path
     *
     * @returns {string}
     */
    get librariesDirectoryPath() {
        return this._librariesDirectoryPath
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
     * get - libraries loaded
     *
     * @returns {Object}
     */
    get librariesLoaded() {
        return this._librariesLoaded
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
     * get - libraries mapping
     *
     * @returns {Object}
     */
    get librariesMapping() {
        return this._librariesMapping
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
