var security = function( BundleManager, params ) {
    /*
     * Global dependencies
     */
    var router              = BundleManager.getRouter();

    /*
     * Skeleton bundle dependencies
     */
    var UserSecurityController   = BundleManager.getFactory( 'User' ).getController( 'Security' );

    /*
     * Security middlewares
     */
    router.use( '/roles/:idrole/users', function( req, res, next ) {
        UserSecurityController.authorize()
        .then( function() {
            next();
        });
    });
};

module.exports = security;
