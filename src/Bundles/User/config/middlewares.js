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
    router.use( '/roles/:idRole/users/:idUser', function( req, res, next ) {
        var requireOptions = {
            requireBy: req.params.idUser,
            options: {
                withRelated: [ 'role' ]
            }
        };

        Controller.doesRequiredElementExists( 'User', requireOptions, BundleManager, function( error, user ) {
            if ( user ) {

                Request.define( 'user', user );
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
