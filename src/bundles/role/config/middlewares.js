export default function middlewares( router, factory ) {
    /*
     * Dependencies
     */
    const roleMiddlewaresController = factory.getController( 'role.Middlewares' )

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        roleMiddlewaresController.registerHttp( req, res )
        next()
    })

    /*
     * Middlewares
     */
    router.use( '/roles/:id', ( req, res, next ) => {
        roleMiddlewaresController.roleExists( next )
    })
}
