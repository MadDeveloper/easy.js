export default function security( bundleManager, params ) {
    /*
     * Global dependencies
     */
    const router = bundleManager.router

    /*
     * Skeleton bundle dependencies
     */
    const skeletonSecurityController = bundleManager.getFactory( 'Skeleton' ).getController( 'Security' )

    /*
     * Security middlewares
     */
    router.use( '/skeletons', ( req, res, next ) => {
        skeletonSecurityController.authorize()
        .then( () => {
            next()
        })
    })
}
