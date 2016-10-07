import UserController 	from './../controllers/UserController'
import { security }		from './config/security'

/**
 * routing - define routes for user bundle
 *
 * @param  {express.Router} router
 */
export default function routing( router ) {
    /*
     * Dependencies
     */
    let userController

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        userController = new UserController( req, res, router )
        next()
    })

    /*
     * Security
     */
    router.use( '/roles/:role_id/users', ( req, res, next ) => {
        userController.authorize({
            restrictions: security[ '/roles/:role_id/users' ],
            focus: 'role_id',
            next
        })
    })

    /*
     * Middlewares
     */
    router.param( 'user_id', ( req, res, next ) => {
        userController.userExists( next )
    })

    /*
    * Routes definitions
    */
    router
		.route( '/roles/:role_id/users' )
	        .get( () => userController.getUsers() )
	        .post( () => userController.createUser() )
	        .all( () => userController.response.methodNotAllowed() )

    router
		.route( '/roles/:role_id/users/:user_id' )
	        .get( () => userController.getUser() )
	        .put( () => userController.updateUser() )
	        .patch( () => userController.patchUser() )
	        .delete( () => userController.deleteUser() )
	        .all( () => userController.response.methodNotAllowed() )
}
