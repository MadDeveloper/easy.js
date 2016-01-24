var security = function( BundleManager, params ) {
    /*
     * Global dependencies
     */
    var router = BundleManager.getRouter();

    /*
     * Skeleton bundle dependencies
     */
    var SkeletonSecurityController = BundleManager.getFactory( 'Skeleton' ).getController( 'Security' );

    /*
     * Security middlewares
     */
    router.use( '/skeletons', function( req, res, next ) {
        SkeletonSecurityController.authorize()
        .then( function() {
            next();
        });
    });
};

module.exports = security;
