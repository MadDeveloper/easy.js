import UserRoutingController from './../controllers/UserRoutingController'

export default function routing( router, factory ) {
    /*
     * Dependencies
     */
    let userRoutingController

    /*
     * Middlewares
     */
    factory.getConfig( 'user.security' )
    factory.getConfig( 'user.middlewares' )

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        userRoutingController = new UserRoutingController( req, res, factory )
        next()
    })

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
