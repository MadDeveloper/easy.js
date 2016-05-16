export default function security( roleFactory, params ) {
    /*
     * Dependencies
     */
    const roleSecurityController    = roleFactory.getController( 'Security' )
    const bundleManager             = roleFactory.bundleManager
    const router                    = bundleManager.router

    /*
     * Security middlewares
     */
    router.use( '/roles', ( req, res, next ) => {
        roleSecurityController.authorize()
        .then( () => {
            next()
        })
    })
}
