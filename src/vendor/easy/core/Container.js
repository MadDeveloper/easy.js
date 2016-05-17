import fs               from 'fs'
import path             from 'path'
import servicesMapping  from './../../../config/services/config'

export default class Container {
    constructor( kernel ) {
        this._kernel    = kernel

        /*
         * Dependencies shared
         */
        this._componentsLoaded   = {}
        this._shared             = {}

        this._servicesDirectoryExists           = false
        this._checkExistanceOfServicesDirectory = true
        this._servicesDirectoryPath             = this._kernel.path.services

        this._componentsMapping = {
            'bundlemanager': this._kernel.path.easy + '/core/BundleManager',
            'controller': this._kernel.path.easy + '/core/Controller',
            'logger': this._kernel.path.easy + '/core/Logger',
            'message': this._kernel.path.easy + '/core/Message',
            'polyfills': this._kernel.path.easy + '/core/Polyfills',
            'connector': this._kernel.path.easy + '/core/database/Connector',
            'http': this._kernel.path.easy + '/core/http/Http',
            'request': this._kernel.path.easy + '/core/http/Request',
            'response': this._kernel.path.easy + '/core/http/Response'
        }

        this._servicesMapping = servicesMapping
    }

    /*
     * Components
     */

    loadComponent( name ) {
        if ( "undefined" === typeof this.componentsLoaded[ name ] ) {
            if ( this.componentsMapping.hasOwnProperty( name ) ) {
                const pathComponent = this.componentsMapping[ name ] + '.js'

                if ( fs.statSync( pathComponent ).isFile() ) {
                    this.componentsLoaded[ name ] = new ( require( pathComponent ) )( this )
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

    storeService( name, pathService ) {
        this.shared[ name ] = new ( require( pathService ) )( this )
    }

    resetService( name ) {
        delete this.shared[ name ]
    }

    getService( name, clearCache ) {
        this.servicesCheckDirectory()

        if ( this.isServiceMapped( name ) ) {

            const serviceFile = this.servicesDirectoryPath + '/' + this.servicesMapping[ name ]+ '.js'

            try {
                const statsServiceFile = fs.lstatSync( serviceFile )

                if ( statsServiceNameDirectory.isFile() ) {

                    this.storeService( name, serviceFile )

                    return this.shared[ service ]

                } else {
                    throw new Error()
                }
            } catch ( error ) {
                this.getComponent( 'Message' ).error({
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
                this.getComponent( 'Message' ).error({
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

    set servicesDirectoryPath( directoryPath ) {
        this._servicesDirectoryPath = directoryPath
        return this
    }

    get componentsLoaded() {
        return this._componentsLoaded
    }

    get shared() {
        return this._shared
    }

    get componentsMapping() {
        return this._componentsMapping
    }

    get servicesMapping() {
        return this._servicesMapping
    }
}
