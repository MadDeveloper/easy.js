import skeletonSecurity     from './security'
import skeletonMiddlewares  from './middlewares'
import SkeletonController   from './../controllers/SkeletonController'

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
    let skeletonController

    /*
     * Register request and response into Controller
     * and register skeletonController into req.tmp
     */
    router.use( ( req, res, next ) => {
        skeletonController = new SkeletonController( req, res, factory )
        req.tmp.skeletonController = skeletonController
        next()
    })

    /*
     * Security & middlewares
     */
    skeletonSecurity( router, factory )
    skeletonMiddlewares( router, factory )

    /*
    * Routes definitions
    */
    router.route( '/skeletons' )
        .get( () => {
            skeletonController.getSkeletons()
        })
        .post( () => {
            skeletonController.createSkeleton()
        })
        .all( () => {
            skeletonController.response.methodNotAllowed()
        })

    router.route( '/skeletons/:skeleton_id' )
        .get( () => {
            skeletonController.getSkeleton()
        })
        .put( () => {
            skeletonController.updateSkeleton()
        })
        .patch( () => {
            skeletonController.patchSkeleton()
        })
        .delete( () => {
            skeletonController.deleteSkeleton()
        })
        .all( () => {
            skeletonController.response.methodNotAllowed()
        })
}
