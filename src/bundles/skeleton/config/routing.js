export default function routing( skeletonFactory, params ) {
    /*
     * Global dependencies
     */
    const bundleManager = skeletonFactory.bundleManager
    const router        = bundleManager.router

    /*
     * Skeleton bundle dependencies
     */
    const skeletonRoutingController   = skeletonFactory.getController( 'Routing' )

    /*
     * Middlewares
     */
    skeletonFactory.getConfig( 'security' )
    skeletonFactory.getConfig( 'middlewares' )

    /*
    * Routes definitions
    */
    router.route( '/skeletons' )
        .get( () => {
        	skeletonRoutingController.getSkeletons()
        })
        .post( () => {
        	skeletonRoutingController.createSkeleton()
        })

    router.route( '/skeletons/:id' )
        .get( () => {
        	skeletonRoutingController.getSkeleton()
        })
        .put( () => {
        	skeletonRoutingController.updateSkeleton()
        })
        .patch( () => {
        	skeletonRoutingController.patchSkeleton()
        })
        .delete( () => {
        	skeletonRoutingController.deleteSkeleton()
        })
}
