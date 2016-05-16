export default function routing( skeletonFactory, params ) {
    /*
     * Dependencies
     */
    const skeletonRoutingController = skeletonFactory.getController( 'Routing' )
    const bundleManager             = skeletonFactory.bundleManager
    const router                    = bundleManager.router

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
