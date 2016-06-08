import RoleSecurityController from './../controllers/RoleSecurityController'

export default function security( router, factory ) {
    /*
     * Dependencies
     */
    let roleSecurityController

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        roleSecurityController = new RoleSecurityController( req, res, factory )
        next()
    })

    /*
     * Security middlewares
     */
    router.use( '/roles', ( req, res, next ) => {
        roleSecurityController.authorize( next )
    })
}
