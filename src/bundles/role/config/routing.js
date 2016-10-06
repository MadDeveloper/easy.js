import RoleController from './../controllers/RoleController'

export default function routing( router, factory ) {
    /*
     * Dependencies
     */
    let roleController, access

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        roleController = new RoleController( req, res, factory )
        next()
    })

    /*
     * Security
     */
    router.use( '/roles', ( req, res, next ) => {
        roleController.authorize({
            restrictions: {
                mustBe: [ access.any ],
                canCreate: [ access.admin ],
                canRead: [],
                canUpdate: [ access.admin ],
                canDelete: [ access.admin ]
            },
            focus: 'role_id',
            next
        })
    })

    /*
     * Middlewares
     */
    router.param( 'role_id', ( req, res, next ) => {
        roleController.roleExists( next )
    })

    /*
     * Routes definitions
     */
    router
		.route( '/roles' )
        	.get( () => roleController.getRoles() )
    		.post( () => roleController.createRole() )
    		.all( () => roleController.response.methodNotAllowed() )

    router
		.route( '/roles/:role_id' )
        	.get( () => roleController.getRole() )
        	.put( () => roleController.updateRole() )
        	.delete( () => roleController.deleteRole() )
        	.all( () => roleController.response.methodNotAllowed() )
}
