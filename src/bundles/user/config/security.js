import UserSecurityController from './../controllers/UserSecurityController'

export default function security( router, factory ) {
    /*
     * Dependencies
     */
    let userSecurityController

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        userSecurityController = new UserSecurityController( req, res, factory )
        next()
    })

    /*
     * Security middlewares
     */
    router.use( '/roles/:idrole/users', ( req, res, next ) => {
        userSecurityController.authorize( next )
    })
}
