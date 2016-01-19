var security = function( BundleManager, params ) {
    /*
     * Global dependencies
     */
    var router              = BundleManager.getRouter();
    var DependencyInjector  = BundleManager.getDependencyInjector();
    var http                = DependencyInjector.getDependency( 'Http' );
    var Controller          = DependencyInjector.getDependency( 'Controller' );
    var access              = DependencyInjector.getService( 'security.access' )();

    /*
     * Security middlewares
     */
    router.use( '/skeletons', function( req, res, next ) {
        if ( Controller.isProdEnv() ) {
            var token = req.token;

            access.restrict({
                mustBe: [ access.any ],
                canCreate: [],
                canRead: [],
                canUpdate: [],
                canDelete: []
            });

            if ( access.focusOn( token.role_id ).canReach( req ) ) {
                next();
            } else {
                http.forbidden( res );
            }
        } else {
            next();
        }
    });
};

module.exports = security;
