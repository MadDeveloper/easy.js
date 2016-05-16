export default function middlewares( skeletonFactory, params ) {
    /*
     * Global dependencies
     */
    const bundleManager = skeletonFactory.bundleManager
    const router        = bundleManager.router

    /*
     * Skeleton bundle dependencies
     */
    const skeletonMiddlewaresController = bundleManager.getFactory( 'Skeleton' ).getController( 'Middlewares' )

    /*
     * Middlewares
     */
    router.use( '/skeletons/:id', ( req, res, next ) => {
        skeletonMiddlewaresController.skeletonExists()
        .then( () => {
            next()
        })
    })
}
