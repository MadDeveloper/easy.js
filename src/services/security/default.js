module.exports = function( BundleManager ) {
    var _                   = require( 'lodash' );
    var router              = BundleManager.getRouter();
    var DependencyInjector  = BundleManager.getDependencyInjector();
    var http                = DependencyInjector.getDependency( 'Http' );
    var Controller          = DependencyInjector.getDependency( 'Controller' );
    var access              = DependencyInjector.getService( 'security.access' )();

    /*
     * Add your defaults policies security
     */
     router.use( function( req, res, next ) {
         next();
     });
};
