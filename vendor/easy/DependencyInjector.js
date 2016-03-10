function DependencyInjector( Kernel ) {

    var fs      = require( 'fs' );
    var path    = require( 'path' );

    return {
        /*
         * Dependencies container
         */
        container: {},

        servicesDirectoryExists: false,
        checkExistanceOfServicesDirectory: true,
        servicesDirectoryPath: __dirname + '/../../src/services',

        isDependencyAlreadyLoaded: function( dependency ) {
            return this.container.hasOwnProperty( dependency );
        },

        getDependency: function( dependency, params ) {
            if ( !this.isDependencyAlreadyLoaded( dependency ) ) {
                /*
                 * Special treatment for specifics dependencies
                 */
                switch ( dependency.toLowerCase() ) {
                    case 'http':
                        params = this;
                        break;
                    case 'request':
                        params = Kernel.getAppName();
                        break;
                    case 'logger':
                        params = this;
                        break;
                    case 'controller':
                        params = this;
                        break;
                }

                this.container[ dependency ] = Kernel.load( dependency )( params );
            }
            return this.container[ dependency ];
        },

        getService: function( service ) {
            if ( false !== this.checkExistanceOfServicesDirectory && false === this.servicesDirectoryExists ) {
                var statsServiceDirectory = fs.lstatSync( this.getServiceDirectoryPath() );
                if ( statsServiceDirectory.isDirectory() ) {
                    this.servicesDirectoryExists = true;
                } else {
                    this.getMessage().error({
                        title: "Service directory not found",
                        message: "Service directory, path: " + this.servicesDirectoryPath + " not found.",
                        type: 'error',
                        exit: 0
                    });
                }
            }

            var serviceInfo             = service.split( '.' );
            var serviceName             = serviceInfo[ 0 ];
            var serviceComponent        = serviceInfo[ 1 ];

            var serviceNameDirectory    = this.servicesDirectoryPath + '/' + serviceName;
            var serviceComponentFile    = serviceNameDirectory + '/' + serviceComponent + '.js';

            try {
                var statsServiceNameDirectory = fs.lstatSync( serviceNameDirectory );

                if ( statsServiceNameDirectory.isDirectory() ) {

                    try {
                        var statsServiceComponentDirectory = fs.lstatSync( serviceComponentFile );


                        if ( statsServiceComponentDirectory.isFile() ) {

                            return require( serviceComponentFile );

                        } else {
                            throw new Error();
                        }
                    } catch ( error ) {
                        this.getMessage().error({
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
                this.getMessage().error({
                    title: "Impossible to call service",
                    message: "Service name " + serviceName + " not found, path: " + path.resolve( serviceNameDirectory ) + "\n" + error,
                    type: 'error',
                    exit: 0
                });
            }
        },

        getServiceDirectoryPath: function() {
            return this.servicesDirectoryPath;
        },

        getMessage: function() {
            return this.getDependency( 'Message' );
        }
    }
}

module.exports = DependencyInjector;
