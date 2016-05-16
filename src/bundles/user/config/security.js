export default function security( userFactory, params ) {
    /*
     * Global dependencies
     */
    const bundleManager = userFactory.bundleManager
    const router        = bundleManager.router

    /*
     * Skeleton bundle dependencies
     */
    const userSecurityController = bundleManager.getFactory( 'User' ).getController( 'Security' )

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
