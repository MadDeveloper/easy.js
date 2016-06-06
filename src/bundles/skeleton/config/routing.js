/**
 * routing - define routes for skeleton bundle
 *
 * @param  {express.Router} router
 * @param  {Factory} factory
 */
export default function routing( router, factory ) {
    /*
     * Dependencies
     */
    const skeletonRoutingController = factory.getController( 'skeleton.Routing' )

    /*
     * Middlewares
     */
    factory.getConfig( 'skeleton.security' )
    factory.getConfig( 'skeleton.middlewares' )

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
