export default function middlewares( userFactory ) {
    /*
     * Dependencies
     */
    const userMiddlewaresController = userFactory.getController( 'Middlewares' )
    const bundleManager             = userFactory.bundleManager
    const router                    = bundleManager.router

    /*
     * Middlewares
     */
    router.use( '/roles/:idRole/users/:idUser', ( req, res, next ) => {
        userMiddlewaresController.userExists()
        .then( () => {
            next()
        })
    })
}
