import userSecurity     from './security'
import userMiddlewares  from './middlewares'
import UserController   from './../controllers/UserController'

export default function routing( router, factory ) {
    /*
     * Dependencies
     */
    let userController

    /*
     * Register request and response into Controller
     * and register userController into req.tmp
     */
    router.use( ( req, res, next ) => {
        userController = new UserController( req, res, factory )
        req.tmp.userController = userController
        next()
    })

    /*
     * Security & middlewares
     */
    userSecurity( router, factory )
    userMiddlewares( router, factory )

    /*
    * Routes definitions
    */
    router.route( '/roles/:role_id/users' )
        .get( () => {
            userController.getUsers()
        })
        .post( () => {
            userController.createUser()
        })
        .all( () => {
            userController.response.methodNotAllowed()
        })

    router.route( '/roles/:role_id/users/:user_id' )
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
        .all( () => {
            userController.response.methodNotAllowed()
        })
}
