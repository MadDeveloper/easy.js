var routing = function( BundleManager, params ) {
    /*
     * Global dependencies
     */
    var router = BundleManager.getRouter();

    /*
     * Role bundle dependencies
     */
    var SkeletonFactory = BundleManager.getFactory( 'Skeleton' );
    var SkeletonRoutingController = SkeletonFactory.getController( 'Routing' );

    /*
     * Middlewares
     */
    SkeletonFactory.getConfig( 'security' );
    SkeletonFactory.getConfig( 'middlewares' );

    /*
    * Routes definitions
    */
    router.route( '/skeletons' )
        .get( function( req, res ) {
            SkeletonRoutingController.getSkeletons();
        })
        .post( function( req, res ) {
            SkeletonRoutingController.createSkeleton();
        });

    router.route( '/skeletons/:id' )
        .get( function( req, res ) {
            SkeletonRoutingController.getSkeleton();
        })
        .put( function( req, res ) {
            SkeletonRoutingController.updateSkeleton();
        })
        .patch( function( req, res ) {
            SkeletonRoutingController.patchSkeleton();
        })
        .delete( function( req, res ) {
            SkeletonRoutingController.deleteSkeleton();
        });
};

module.exports = routing;
