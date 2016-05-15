export default function routing( bundleManager, params ) {
    /*
     * Global dependencies
     */
    const router = bundleManager.router

    /*
     * Skeleton bundle dependencies
     */
    const skeletonFactory             = bundleManager.getFactory( 'Skeleton' )
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
