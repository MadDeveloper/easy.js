import RoleRoutingController from './../controllers/RoleRoutingController'

export default function routing( router, factory ) {
    /*
     * Dependencies
     */
    let roleRoutingController

    /*
     * Middlewares
     */
    factory.getConfig( 'role.security' )
    factory.getConfig( 'role.middlewares' )

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        roleRoutingController = new RoleRoutingController( req, res, factory )
        next()
    })

    /*
     * Routes definitions
     */
    router.route( '/roles' )
        .get( ( req, res ) => {
            roleRoutingController.getRoles( req, res )
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
