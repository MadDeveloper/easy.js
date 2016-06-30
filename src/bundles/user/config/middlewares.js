export default function middlewares( router, factory ) {
    /*
     * Dependencies
     */
    let userController

    /*
     * Retrieve userController
     */
    router.use( ( req, res, next ) => {
        userController = req.tmp.userController
        next()
    })

    /*
     * Middlewares
     */
    router.param( 'user_id', ( req, res, next ) => {
        userController.userExists( next )
    })
}
