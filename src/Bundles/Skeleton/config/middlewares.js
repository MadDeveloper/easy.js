var middlewares = function( BundleManager, params ) {
    /*
     * Global dependencies
     */
    var router              = BundleManager.getRouter();
    var http                = BundleManager.getDependencyInjector().getDependency( 'Http' );
    var Controller          = BundleManager.getDependencyInjector().getDependency( 'Controller' );
    var Request             = BundleManager.getDependencyInjector().getDependency( 'Request' );

    /*
     * Middlewares
     */
    router.use( '/skeletons/:id', function( req, res, next ) {
        var requireOptions = {
            requireBy: req.params.id,
            options: {}
        };

        Controller.doesRequiredElementExists( 'Skeleton', requireOptions, BundleManager, function( error, skeleton ) {
            if ( skeleton ) {

                Request.define( 'skeleton', skeleton );
                next();

            } else {
                if ( 'internalServerError' === error.type ) {
                    http.internalServerError( req, res, error.exactly );
                } else {
                    http[ error.type ]( res );
                }
            }
        });
    });
};

module.exports = middlewares;
