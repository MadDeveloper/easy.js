import SkeletonMiddlewaresController from './../controllers/SkeletonMiddlewaresController'

export default function middlewares( router, factory ) {
    /*
     * Dependencies
     */
    let skeletonMiddlewaresController

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        skeletonMiddlewaresController = new SkeletonMiddlewaresController( req, res, factory )
        next()
    })

    /*
     * Middlewares
     */
    router.use( '/skeletons/:id', ( req, res, next ) => {
        skeletonMiddlewaresController.skeletonExists( next )
    })
}
