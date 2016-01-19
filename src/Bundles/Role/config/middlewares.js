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
    router.use( '/roles/:id', function( req, res, next ) {
        Controller.doesRequiredElementExists( 'Role', req.params.id, BundleManager, function( error, role ) {

            if ( role ) {

                Request.define( 'role', role );
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
