export default function security( router, factory ) {
    /*
     * Dependencies
     */
    const roleSecurityController = factory.getController( 'role.Security' )

    /*
     * Security middlewares
     */
    router.use( '/roles', ( req, res, next ) => {
        roleSecurityController.authorize( next )
    })
}
