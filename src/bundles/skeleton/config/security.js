export default function security( router, factory ) {
    /*
     * Dependencies
     */
    const skeletonSecurityController = factory.getController( 'skeleton.Security' )

    /*
     * Security middlewares
     */
    router.use( '/skeletons', ( req, res, next ) => {
        skeletonSecurityController.authorize( next )
    })
}
