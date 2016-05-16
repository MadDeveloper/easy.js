export default function routing( userFactory, params ) {
    /*
     * Dependencies
     */
    const userRoutingController = userFactory.getController( 'Routing' )
    const bundleManager         = userFactory.bundleManager
    const router                = bundleManager.router

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
