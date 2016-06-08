import SkeletonSecurityController from './../controllers/SkeletonSecurityController'

export default function security( router, factory ) {
    /*
     * Dependencies
     */
    let skeletonSecurityController

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        skeletonSecurityController = new SkeletonSecurityController( req, res, factory )
        next()
    })

    /*
     * Security middlewares
     */
    router.use( '/skeletons', ( req, res, next ) => {
        skeletonSecurityController.authorize( next )
    })
}
