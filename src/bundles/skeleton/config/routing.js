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
        .get( function() {
        	SkeletonRoutingController.getSkeletons();
        })
        .post( function() {
        	SkeletonRoutingController.createSkeleton();
        });

    router.route( '/skeletons/:id' )
        .get( function() {
        	SkeletonRoutingController.getSkeleton();
        })
        .put( function() {
        	SkeletonRoutingController.updateSkeleton();
        })
        .patch( function() {
        	SkeletonRoutingController.patchSkeleton();
        })
        .delete( function() {
        	SkeletonRoutingController.deleteSkeleton();
        });
};

module.exports = routing;
