export default function middlewares( router, factory ) {
    /*
     * Dependencies
     */
    const skeletonMiddlewaresController = factory.getController( 'skeleton.Middlewares' )

    /*
     * Middlewares
     */
    router.use( '/skeletons/:id', ( req, res, next ) => {
        skeletonMiddlewaresController.skeletonExists( next )
    })
}
