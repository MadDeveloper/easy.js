var routing = function( BundleManager ) {
    /*
     * Middlewares
     */
        /*
         * Use Request class as a middleware to manage request scope vars
         */
        BundleManager.getRouter().use( function( req, res, next ) {
            BundleManager.getDependencyInjector().getDependency( 'Request' ).registerRequestScope( req );
            next();
        });

        /*
         * Security
         */
        require( __dirname + '/security/authentication' )( BundleManager );
        BundleManager.getDependencyInjector().getService( 'security.default' )( BundleManager );

    /*
    * bundles routes definitions
    */
    BundleManager.getBundlesRegisteredRouting();

    /*
     * Final middleware: No route found
     */
    BundleManager.getRouter().use( function( req, res ) {
        if ( !res.headersSent ) { // if you want strict mode, comment this condition
             BundleManager.getDependencyInjector().getDependency( 'Http' ).notFound( res );
        }
    });
};

module.exports = routing;
