export default function security( router, factory ) {
    /*
     * Dependencies
     */
    const userSecurityController    = factory.getController( 'user.Security' )

    /*
     * Security middlewares
     */
    router.use( '/roles/:idrole/users', ( req, res, next ) => {
        userSecurityController.authorize( next )
    })
}
