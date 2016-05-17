export default function middlewares( roleFactory ) {
    /*
     * Dependencies
     */
    const roleMiddlewaresController = roleFactory.getController( 'Middlewares' )
    const bundleManager             = roleFactory.bundleManager
    const router                    = bundleManager.router

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
