export default function middlewares( bundleManager, params ) {
    /*
     * Global dependencies
     */
    const router = bundleManager.router;

    /*
     * Skeleton bundle dependencies
     */
    const SkeletonMiddlewaresController = bundleManager.getFactory( 'Skeleton' ).getController( 'Middlewares' );

    /*
     * Middlewares
     */
    router.use( '/skeletons/:id', ( req, res, next ) => {
        SkeletonMiddlewaresController.skeletonExists()
        .then( function() {
            next();
        });
    });
};

module.exports = middlewares;
