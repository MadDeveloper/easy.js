import userSecurity     from './security'
import userMiddlewares  from './middlewares'
import UserController   from './../controllers/UserController'

export default function routing( router, factory ) {
    /*
     * Dependencies
     */
    let userController

    /*
     * Security & middlewares
     */
    userSecurity( router, factory )
    userMiddlewares( router, factory )

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        userController = new UserController( req, res, factory )
        next()
    })

    /*
    * Routes definitions
    */
    router.route( '/roles/:idRole/users' )
        .get( () => {
            userController.getUsers()
        })
        .post( () => {
            userController.createUser()
        })

    router.route( '/roles/:idRole/users/:idUser' )
        .get( () => {
            userController.getUser()
        })
        .put( () => {
            userController.updateUser()
        })
        .patch( () => {
            userController.patchUser()
        })
        .delete( () => {
            userController.deleteUser()
        })
}
