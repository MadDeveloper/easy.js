import fs                   from 'fs'
import path                 from 'path'
import servicesMapping      from './../../../config/services'
import userLibrariesMapping from './../../../config/lib'

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
        this._userLibrariesLoaded   = {}
        this._shared                = {}

        this._servicesDirectoryExists           = false
        this._checkExistanceOfServicesDirectory = true
        this._servicesDirectoryPath             = this._kernel.path.services

        this._userLibrariesDirectoryExists           = false
        this._checkExistanceOfUserLibrariesDirectory = true
        this._userLibrariesDirectoryPath             = this._kernel.path.lib

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
        this._librariesMapping = {
            'string': `${this._kernel.path.vendor.easy}/lib/string`
        }
        this._servicesMapping       = servicesMapping
        this._userLibrariesMapping  = userLibrariesMapping
    }

    /*
     * Components
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

    isComponentLoaded( name ) {
        return this.componentsLoaded.hasOwnProperty( name  )
    }

    isComponentMapped( name ) {
        return this.componentsMapping.hasOwnProperty( name )
    }

    /*
     * Services
     */
    isServiceMapped( name ) {
        return this.servicesMapping.hasOwnProperty( name )
    }

    isServicesLoaded( name ) {
        return this.shared.hasOwnProperty( name )
    }

    storeService( name, path ) {
        const serviceClass  = require( path ).default /* .default is needed to patch babel exports.default build, require doesn't work, import does */
        this.shared[ name ] = new serviceClass( this.injectDependencies( name ) )
    }

    reloadService( name ) {
        if ( this.isServiceMapped( name ) && this.isServicesLoaded( name ) ) {
            delete this.shared[ name ]
            this.getService( name )
        }
    }

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

    getService( name, clearCache ) {
        this.servicesCheckDirectory()

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

    servicesCheckDirectory() {
        if ( false !== this._checkExistanceOfServicesDirectory && false === this._servicesDirectoryExists ) {
            const statsServiceDirectory = fs.lstatSync( this.servicesDirectoryPath )

            if ( statsServiceDirectory.isDirectory() ) {
                this._servicesDirectoryExists = true
            } else {
                this.getComponent( 'Console' ).error({
                    title: "Service directory not found",
                    message: `Directory path resolved: ${this.servicesDirectoryPath}`,
                    type: 'error',
                    exit: 0
                })
            }
        }

        return true
    }

    /*
     * Libraries
     */
    isLibraryMapped( name ) {
        return this.librariesMapping.hasOwnProperty( name )
    }

    isLibraryLoaded( name ) {
        return this.librariesLoaded.hasOwnProperty( name )
    }

    reloadLibrary( name ) {
        if ( this.isLibraryMapped( name ) && this.isLibraryLoaded( name ) ) {
            delete this.librariesLoaded[ name ]
            this.getLibrary( name )
        }
    }

    getLibrary( name ) {
        name = name.toLowerCase()

        if ( this.isLibraryMapped( name ) ) {
            if ( this.isLibraryLoaded( name ) ) {
                return this.librariesLoaded[ name ]
            }

            const pathLibrary   = `${this.librariesMapping[ name ]}.js`
            const library       = require( pathLibrary )

            this.librariesLoaded[ name ] = library

            return this.librariesLoaded[ name ]
        } else {
            return undefined
        }
    }

    /*
     * User libraries
     */
    isUserLibraryMapped( name ) {
        return this.userLibrariesMapping.hasOwnProperty( name )
    }

    isUserLibraryLoaded( name ) {
        return this.userLibrariesLoaded.hasOwnProperty( name )
    }

    storeUserLibrary( name, pathLibrary ) {
        const library = require( pathLibrary )
        this.userLibrariesLoaded[ name ] = library
    }

    reloadUserLibrary( name ) {
        if ( this.isUserLibraryMapped( name ) && this.isUserLibraryLoaded( name ) ) {
            delete this.userLibrariesLoaded[ name ]
            this.getUserLibrary( name )
        }
    }

    getUserLibrary( name, clearCache ) {
        this.servicesCheckDirectory()

        if ( this.isUserLibraryMapped( name ) ) {

            if ( clearCache ) {
                this.reloadUserLibrary( name )
            }

            if ( this.isUserLibraryLoaded( name ) ) {
                return this.userLibrariesLoaded[ name ]
            }

            const userLibraryFile = `${this.userLibrariesDirectoryPath}/${this.userLibrariesMapping[ name ]}.js`

            try {
                const statsUserLibraryFile = fs.lstatSync( userLibraryFile )

                if ( statsUserLibraryFile.isFile() ) {

                    this.storeUserLibrary( name, userLibraryFile )

                    return this.userLibrariesLoaded[ name ]

                } else {
                    throw new Error()
                }
            } catch ( error ) {
                this.getComponent( 'Console' ).error({
                    title: "Impossible to call user library",
                    message: `Library ${name} not found, path: ${path.resolve( userLibraryFile )}\n${error}`,
                    type: 'error',
                    exit: 0
                })
            }

        } else {
            return undefined
        }
    }

    userLibrariesCheckDirectory() {
        if ( false !== this._checkExistanceOfUserLibrariesDirectory && false === this._userLibrariesDirectoryExists ) {
            const statsUserLibrariesDirectory = fs.lstatSync( this.userLibrariesDirectoryPath )

            if ( statsUserLibrariesDirectory.isDirectory() ) {
                this._userLibrariesDirectoryExists = true
            } else {
                this.getComponent( 'Console' ).error({
                    title: "User's libraries directory not found",
                    message: `Directory path resolved: ${this.userLibrariesDirectoryPath}`,
                    type: 'error',
                    exit: 0
                })
            }
        }

        return true
    }


    /*
     * Getters and setters
     */
    get kernel() {
        return this._kernel
    }

    get servicesDirectoryPath() {
        return this._servicesDirectoryPath
    }

    get userLibrariesDirectoryPath() {
        return this._userLibrariesDirectoryPath
    }

    get componentsLoaded() {
        return this._componentsLoaded
    }

    get shared() {
        return this._shared
    }

    get librariesLoaded() {
        return this._librariesLoaded
    }

    get userLibrariesLoaded() {
        return this._userLibrariesLoaded
    }

    get componentsMapping() {
        return this._componentsMapping
    }

    get librariesMapping() {
        return this._librariesMapping
    }

    get servicesMapping() {
        return this._servicesMapping
    }

    get userLibrariesMapping() {
        return this._userLibrariesMapping
    }
}
