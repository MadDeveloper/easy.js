var routing = function( BundleManager ) {
    /*
     * Middlewares
     */
        /*
         * Use Request ans Response class as a middleware to manage respectively request and response scope vars
         */
        BundleManager.getRouter().use( function( req, res, next ) {
            BundleManager.getDependencyInjector().getDependency( 'Request' ).registerRequestScope( req );
            BundleManager.getDependencyInjector().getDependency( 'Response' ).registerResponseScope( res );
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
             BundleManager.getDependencyInjector().getDependency( 'Http' ).notFound();
        }
    });
};

module.exports = routing;
