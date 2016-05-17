export default function routing( roleFactory ) {
    /*
     * Dependencies
     */
    const roleRoutingController = roleFactory.getController( 'Routing' )
    const bundleManager         = roleFactory.bundleManager
    const router                = bundleManager.router

    /*
     * Middlewares
     */
    roleFactory.getConfig( 'security' )
    roleFactory.getConfig( 'middlewares' )

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
