import SkeletonRoutingController from './../controllers/SkeletonRoutingController'

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
    let skeletonRoutingController

    /*
     * Middlewares
     */
    factory.getConfig( 'skeleton.security' )
    factory.getConfig( 'skeleton.middlewares' )

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        skeletonRoutingController = new SkeletonRoutingController( req, res, factory )
        next()
    })

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
