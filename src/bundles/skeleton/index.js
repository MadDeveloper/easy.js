import SkeletonController   from './../controllers/SkeletonController'
import { security }         from './config/security'

/**
 * routing - define routes for skeleton bundle
 *
 * @param  {express.Router} router
 */
export default function routing( router ) {
    let skeletonController

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        skeletonController = new SkeletonController( req, res, router )
        next()
    })

	/*
	 * Security
	 */
    router.use( '/skeletons', ( req, res, next ) => {
        skeletonController.authorize({
            restrictions: security[ '/skeletons' ],
            focus: 'role_id',
            next
        })
    })

    /*
     * Middlewares
     */
	router.param( 'skeleton_id', ( req, res, next ) => {
        skeletonController.skeletonExists( next )
    })

    /*
    * Routes definitions
    */
    router
		.route( '/skeletons' )
	        .get( () => skeletonController.getSkeletons() )
	        .post( () => skeletonController.createSkeleton() )
	        .all( () => skeletonController.response.methodNotAllowed() )

    router
		.route( '/skeletons/:skeleton_id' )
	        .get( () => skeletonController.getSkeleton() )
	        .put( () => skeletonController.updateSkeleton() )
	        .patch( () => skeletonController.patchSkeleton() )
	        .delete( () => skeletonController.deleteSkeleton() )
	        .all( () => skeletonController.response.methodNotAllowed() )
}
