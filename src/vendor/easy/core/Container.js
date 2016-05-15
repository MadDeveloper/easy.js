import fs from 'fs'
import path from 'path'

export default class Container
    contructor( kernel ) {
        this._kernel = kernel
        this._message = this.getComponent( 'Message' )

        /*
         * Dependencies shared
         */
        this.shared = {}

        this._servicesDirectoryExists = false
        this._checkExistanceOfServicesDirectory = true
        this._servicesDirectoryPath = __dirname + '/../../../src/services'
    }

    isComponentAlreadyLoaded( component ) {
        return this.shared.hasOwnProperty( component );
    }

    getComponent( component, params ) {
        if ( !this.isComponentAlreadyLoaded( component ) ) {
            /*
             * Special treatment for specifics dependencies
             */
            switch ( component.toLowerCase() ) {
                case 'http':
                    params = this;
                    break;
                case 'request':
                    params = this.kernel.getAppName();
                    break;
                case 'logger':
                    params = this;
                    break;
                case 'controller':
                    params = this;
                    break;
            }

            this.shared[ component ] = new ( this.kernel.load( component ) )( params );
        }

        return this.shared[ component ];
    }

    getService( service, clearCache ) {
        if ( false !== this.checkExistanceOfServicesDirectory && false === this.servicesDirectoryExists ) {
            const statsServiceDirectory = fs.lstatSync( this.servicesDirectoryPath );

            if ( statsServiceDirectory.isDirectory() ) {
                this.servicesDirectoryExists = true;
            } else {
                this.message.error({
                    title: "Service directory not found",
                    message: "Service directory, path: " + this.servicesDirectoryPath + " not found.",
                    type: 'error',
                    exit: 0
                });
            }
        }

        const serviceInfo             = service.split( '.' );
        const serviceName             = serviceInfo[ 0 ];
        const serviceComponent        = serviceInfo[ 1 ];
        const serviceNameDirectory    = this.servicesDirectoryPath + '/' + serviceName;
        const serviceComponentFile    = serviceNameDirectory + '/' + serviceComponent + '.js';

        try {
            const statsServiceNameDirectory = fs.lstatSync( serviceNameDirectory );

            if ( statsServiceNameDirectory.isDirectory() ) {

                try {
                    const statsServiceComponentDirectory = fs.lstatSync( serviceComponentFile );


                    if ( statsServiceComponentDirectory.isFile() ) {

                        if ( clearCache ) {
        				   	delete require.cache[ require.resolve( serviceComponentFile ) ];
                        }

                        return require( serviceComponentFile );

                    } else {
                        throw new Error();
                    }
                } catch ( error ) {
                    this.message.error({
                        title: "Impossible to call service",
                        message: error,
                        type: 'error',
                        exit: 0
                    });
                }

            } else {
                throw new Error();
            }
        } catch ( error ) {
            this.message.error({
                title: "Impossible to call service",
                message: "Service name " + serviceName + " not found, path: " + path.resolve( serviceNameDirectory ) + "\n" + error,
                type: 'error',
                exit: 0
            });
        }
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
}
