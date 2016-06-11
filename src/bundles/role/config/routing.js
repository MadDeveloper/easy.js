import roleSecurity     from './security'
import roleMiddlewares  from './middlewares'
import RoleController   from './../controllers/RoleController'

export default function routing( router, factory ) {
    /*
     * Dependencies
     */
    let roleController

    /*
     * Security & middlewares
     */
    roleSecurity( router, factory )
    roleMiddlewares( router, factory )

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        roleController = new RoleController( req, res, factory )
        next()
    })

    /*
     * Routes definitions
     */
    router.route( '/roles' )
        .get( ( req, res ) => {
            roleController.getRoles( req, res )
        })
        .post( () => {
            roleController.createRole()
        })

    router.route( '/roles/:id' )
        .get( () => {
            roleController.getRole()
        })
        .put( () => {
            roleController.updateRole()
        })
        .delete( () => {
            roleController.deleteRole()
        })
}
