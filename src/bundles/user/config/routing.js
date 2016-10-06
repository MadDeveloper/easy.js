import UserController from './../controllers/UserController'

export default function routing( router, factory ) {
    /*
     * Dependencies
     */
    let userController, access

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        userController = new UserController( req, res, factory )
        next()
    })

    /*
     * Security
     */
    router.use( '/roles/:role_id/users', ( req, res, next ) => {
        userController.authorize({
            restrictions: {
                mustBe: [ access.any ],
                canCreate: [ access.user ],
                canRead: [],
                canUpdate: [ access.user ],
                canDelete: [ access.user ]
            },
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
