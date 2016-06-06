export default function middlewares( router, factory ) {
    /*
     * Dependencies
     */
    const userMiddlewaresController = factory.getController( 'user.Middlewares' )

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
