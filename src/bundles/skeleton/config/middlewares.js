export default function middlewares( skeletonFactory, params ) {
    /*
     * Dependencies
     */
    const skeletonMiddlewaresController = skeletonFactory.getController( 'Middlewares' )
    const bundleManager                 = skeletonFactory.bundleManager
    const router                        = bundleManager.router

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
