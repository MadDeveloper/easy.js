var fs = require( 'fs' );

function BundleManager ( Kernel, databaseConnector, router ) {
    return {
        bundlesRegistered: [],

        DependencyInjector: null,

        register: function( bundle ) {
            var bundleDirPath = this.getBundlesDir() + '/' + bundle;

            if ( fs.statSync( bundleDirPath).isDirectory() ) {
                this.bundlesRegistered.push( bundle );
            }

            return this;
        },

        getFactory: function( bundle, params ) {
            var factoryPath = this.getBundlesDir() + '/' + bundle + '/Pattern/Factory.js';

            if ( fs.statSync( factoryPath ).isFile() ) {
                return new ( require( factoryPath ) )( this, params );
            }
        },

        getRouting: function( bundle, params ) {
            var routingPath = this.getBundlesDir() + '/' + bundle + '/config/routing.js';

            if ( fs.statSync( routingPath ).isFile() ) {
                return require( routingPath )( this, params );
            }
        },

        getBundlesRegisteredRouting: function( params ) {
            var bundles = this.getBundlesRegistered();
            var routingPath = '';

            for ( var i in bundles) {
                routingPath = this.getBundlesDir() + '/' + bundles[ i ] + '/config/routing.js';

                if ( fs.statSync( routingPath ).isFile() ) {
                    require( routingPath )( this, params );
                }
            }
        },

        getDependencyInjector: function() {
            if ( null === this.DependencyInjector ) {
                this.DependencyInjector = Kernel.load( 'DependencyInjector' )( Kernel );
            }
            return this.DependencyInjector;
        },

        getDatabase: function() {
            return databaseConnector.getConnection();
        },

        getBundlesDir: function() {
            return Kernel.path.Bundles;
        },

        getBundlesRegistered: function() {
            return this.bundlesRegistered;
        },

        getRouter: function() {
            return router;
        },

        /*
         * Aliases
         */
        getAppName: function() {
            return Kernel.getAppName();
        }
    }
}

module.exports = BundleManager;
