export default function middlewares( router, factory ) {
    /*
     * Dependencies
     */
    let skeletonController

    /*
     * Retrieve skeletonController
     */
    router.use( ( req, res, next ) => {
        skeletonController = req.tmp.skeletonController
        next()
    })

    /*
     * Middlewares
     */
    router.param( 'skeleton_id', ( req, res, next ) => {
        skeletonController.skeletonExists( next )
    })
}
