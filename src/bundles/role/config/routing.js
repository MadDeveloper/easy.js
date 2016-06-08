export default function routing( router, factory ) {
    /*
     * Dependencies
     */
    const roleRoutingController = factory.getController( 'role.Routing' )

    /*
     * Middlewares
     */
    factory.getConfig( 'role.security' )
    factory.getConfig( 'role.middlewares' )

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        roleRoutingController.registerHttp( req, res )
        next()
    })

    /*
     * Routes definitions
     */
    router.route( '/roles' )
        .get( () => {
            roleRoutingController.getRoles()
        })
        .post( () => {
            roleRoutingController.createRole()
        })

    router.route( '/roles/:id' )
        .get( () => {
            roleRoutingController.getRole()
        })
        .put( () => {
            roleRoutingController.updateRole()
        })
        .delete( () => {
            roleRoutingController.deleteRole()
        })
}
