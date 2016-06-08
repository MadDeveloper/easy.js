export default function security( router, factory ) {
    /*
     * Dependencies
     */
    const roleSecurityController = factory.getController( 'role.Security' )

    /*
     * Register request and response into Controller
     */
    router.use( ( req, res, next ) => {
        roleSecurityController.registerHttp( req, res )
        next()
    })

    /*
     * Security middlewares
     */
    router.use( '/roles', ( req, res, next ) => {
        roleSecurityController.authorize( next )
    })
}
