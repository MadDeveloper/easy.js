import fs               from 'fs'
import path             from 'path'
import servicesMapping  from './../../../config/services/config'

export default class Container {
    contructor( kernel ) {
        this._kernel    = kernel
        this._message   = this.getComponent( 'Message' )

        /*
         * Dependencies shared
         */
        this.componentsLoaded   = {}
        this.shared             = {}

        this._servicesDirectoryExists           = false
        this._checkExistanceOfServicesDirectory = true
        this._servicesDirectoryPath             = this._kernel.path.services

        this._componentsMapping = {
            'bundlemanager': './BundleManager',
            'controller': './Controller',
            'logger': './Logger',
            'message': './Message',
            'polyfills': './Polyfills',
            'connector': './../database/Connector',
            'http': './../http/Http',
            'request': './../http/Request',
            'response': './../http/Response'
        }

        this._servicesMapping = servicesMapping
    }

    /*
     * Components
     */

    loadComponent( name ) {
        if ( "undefined" === typeof this.componentsLoaded[ name ] ) {
            if ( this.componentsMapping.hasOwnProperty( name ) ) {
                const path = this.componentsMapping[ name ]

                if ( fs.statSync( path ).isFile() ) {
                    this.componentsLoaded[ name ] = new ( require( path ) )( this )
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
        this.shared[ name ] = new ( require( path ) )( this )
    }

    resetService( name ) {
        delete this.shared[ name ]
    }

    getService( name, clearCache ) {
        this.servicesCheckDirectory()

        if ( this.isServiceMapped( name ) ) {

            const serviceFile = this.servicesDirectoryPath + '/' + this.servicesMapping[ name ]

            try {
                const statsServiceFile = fs.lstatSync( serviceFile )

                if ( statsServiceNameDirectory.isFile() ) {

                    this.storeService( name, serviceFile )

                    return this.shared[ service ]

                } else {
                    throw new Error()
                }
            } catch ( error ) {
                this.message.error({
                    title: "Impossible to call service",
                    message: "Service " + name + " not found, path: " + path.resolve( serviceFile ) + "\n" + error,
                    type: 'error',
                    exit: 0
                })
            }

        } else {
            return undefined
        }
    }

    servicesCheckDirectory() {
        if ( false !== this.checkExistanceOfServicesDirectory && false === this.servicesDirectoryExists ) {
            const statsServiceDirectory = fs.lstatSync( this.servicesDirectoryPath )

            if ( statsServiceDirectory.isDirectory() ) {
                this.servicesDirectoryExists = true
            } else {
                this.message.error({
                    title: "Service directory not found",
                    message: "Service directory path resolved: " + this.servicesDirectoryPath,
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

    get message() {
        return this._message
    }

    get servicesDirectoryExists() {
        return this._servicesDirectoryExists
    }

    set servicesDirectoryExists( exists ) {
        this._servicesDirectoryExists = exists
        return this
    }

    get checkExistanceOfServicesDirectory() {
        return this._checkExistanceOfServicesDirectory
    }

    set checkExistanceOfServicesDirectory( check ) {
        this._checkExistanceOfServicesDirectory = check
        return this
    }

    get servicesDirectoryPath() {
        return this._servicesDirectoryPath
    }

    set servicesDirectoryPath( path ) {
        this._servicesDirectoryPath = path
        return this
    }

    get componentsLoaded() {
        return this._componentsLoaded
    }

    get componentsMapping() {
        return this._componentsMapping
    }

    get servicesMapping() {
        return this._servicesMapping
    }
}
