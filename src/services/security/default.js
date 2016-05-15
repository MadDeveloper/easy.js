module.exports = function( BundleManager ) {
    var _                   = require( 'lodash' );
    var router              = BundleManager.getRouter();
    var Container  = BundleManager.getContainer();
    var http                = Container.getDependency( 'Http' );
    var Controller          = Container.getDependency( 'Controller' );
    var access              = Container.getService( 'security.access' )();

    /*
     * Add your defaults policies security
     */
     router.use( function( req, res, next ) {
         next();
     });
};
