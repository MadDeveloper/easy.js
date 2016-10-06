import SkeletonController from './../controllers/SkeletonController'

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
    let skeletonController, access

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        skeletonController = new SkeletonController( req, res, factory )
        next()
    })

	/*
	 * Security
	 */
    router.use( '/skeletons', ( req, res, next ) => {
        skeletonController.authorize({
            restrictions: {
                mustBe: [ access.any ],
                canCreate: [],
                canRead: [],
                canUpdate: [],
                canDelete: []
            },
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
