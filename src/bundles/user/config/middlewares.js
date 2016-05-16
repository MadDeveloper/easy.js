export default function middlewares( userFactory, params ) {
    /*
     * Global dependencies
     */
    const bundleManager = userFactory.bundleManager
    const router        = bundleManager.router

    /*
     * Skeleton bundle dependencies
     */
    const userMiddlewaresController = bundleManager.getFactory( 'User' ).getController( 'Middlewares' )

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
