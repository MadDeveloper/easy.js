export default function security( userFactory ) {
    /*
     * Dependencies
     */
    const userSecurityController    = userFactory.getController( 'Security' )
    const bundleManager             = userFactory.bundleManager
    const router                    = bundleManager.router

    /*
     * Security middlewares
     */
    router.use( '/roles/:idrole/users', ( req, res, next ) => {
        userSecurityController.authorize()
        .then( () => {
            next()
        })
    })
}
