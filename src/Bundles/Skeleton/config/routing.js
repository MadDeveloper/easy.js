var routing = function( BundleManager, params ) {
    /*
     * Global dependencies
     */
    var router = BundleManager.getRouter();

    /*
     * Skeleton bundle dependencies
     */
    var SkeletonFactory             = BundleManager.getFactory( 'Skeleton' );
    var SkeletonRoutingController   = SkeletonFactory.getController( 'Routing' );

    /*
     * Middlewares
     */
    SkeletonFactory.getConfig( 'security' );
    SkeletonFactory.getConfig( 'middlewares' );

    /*
    * Routes definitions
    */
    router.route( '/skeletons' )
        .get( SkeletonRoutingController.getSkeletons )
        .post( SkeletonRoutingController.createSkeleton );

    router.route( '/skeletons/:id' )
        .get( SkeletonRoutingController.getSkeleton )
        .put( SkeletonRoutingController.updateSkeleton )
        .patch( SkeletonRoutingController.patchSkeleton )
        .delete( SkeletonRoutingController.deleteSkeleton );
};

module.exports = routing;
