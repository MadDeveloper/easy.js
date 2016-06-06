export default function middlewares( router, factory ) {
    /*
     * Dependencies
     */
    const roleMiddlewaresController = factory.getController( 'role.Middlewares' )

    /*
     * Middlewares
     */
    router.use( '/roles/:id', ( req, res, next ) => {
        roleMiddlewaresController.roleExists()
        .then( () => {
            next()
        })
    })
}
