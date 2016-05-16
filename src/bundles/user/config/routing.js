export default function routing( userFactory, params ) {
    /*
     * Global dependencies
     */
    const bundleManager = userFactory.bundleManager
    const router        = bundleManager.router

    /*
     * User bundle dependencies
     */
    const userRoutingController = userFactory.getController( 'Routing' )

    /*
     * Middlewares
     */
    userFactory.getConfig( 'security' )
    userFactory.getConfig( 'middlewares' )

    /*
    * Routes definitions
    */
    router.route( '/roles/:idRole/users' )
        .get( () => {
        	userRoutingController.getUsers()
        })
        .post( () => {
        	userRoutingController.createUser()
        })

    router.route( '/roles/:idRole/users/:idUser' )
        .get( () => {
        	userRoutingController.getUser()
        })
        .put( () => {
        	userRoutingController.updateUser()
        })
        .patch( () => {
        	userRoutingController.patchUser()
        })
        .delete( () => {
        	userRoutingController.deleteUser()
        })
}
