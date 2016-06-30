export default function middlewares( router, factory ) {
    /*
     * Dependencies
     */
    let roleController

    /*
     * Retrieve roleController
     */
    router.use( ( req, res, next ) => {
        roleController = req.tmp.roleController
        next()
    })

    /*
     * Middlewares
     */
    router.param( 'role_id', ( req, res, next ) => {
        roleController.roleExists( next )
    })
}
