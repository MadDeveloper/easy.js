import roleSecurity     from './security'
import roleMiddlewares  from './middlewares'
import RoleController   from './../controllers/RoleController'

export default function routing( router, factory ) {
    /*
     * Dependencies
     */
    let roleController

    /*
     * Register request and response into Controller
     * and register roleController into req.tmp
     */
    router.use( ( req, res, next ) => {
        roleController          = new RoleController( req, res, factory )
        req.tmp.roleController  = roleController
        next()
    })

    /*
     * Security & middlewares
     */
    roleSecurity( router, factory )
    roleMiddlewares( router, factory )

    /*
     * Routes definitions
     */
    router.route( '/roles' )
        .get( () => {
            roleController.getRoles()
        })
        .post( () => {
            roleController.createRole()
        })
        .all( () => {
            roleController.response.methodNotAllowed()
        })

    router.route( '/roles/:role_id' )
        .get( () => {
            roleController.getRole()
        })
        .put( () => {
            roleController.updateRole()
        })
        .delete( () => {
            roleController.deleteRole()
        })
        .all( () => {
            roleController.response.methodNotAllowed()
        })
}
