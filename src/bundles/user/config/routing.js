export default function routing( router, factory ) {
    /*
     * Dependencies
     */
    const userRoutingController = factory.getController( 'user.Routing' )

    /*
     * Middlewares
     */
    factory.getConfig( 'user.security' )
    factory.getConfig( 'user.middlewares' )

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
