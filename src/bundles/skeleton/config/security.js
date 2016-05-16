export default function security( skeletonFactory, params ) {
    /*
     * Dependencies
     */
    const skeletonSecurityController    = skeletonFactory.getController( 'Security' )
    const bundleManager                 = skeletonFactory.bundleManager
    const router                        = bundleManager.router

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
