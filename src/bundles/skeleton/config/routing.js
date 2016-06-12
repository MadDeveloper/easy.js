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
     * Security & middlewares
     */
    skeletonSecurity( router, factory )
    skeletonMiddlewares( router, factory )

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        skeletonController = new SkeletonController( req, res, factory )
        next()
    })

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
            skeletonController.methodNotAllowed()
        })

    router.route( '/skeletons/:id' )
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
            skeletonController.methodNotAllowed()
        })
}
