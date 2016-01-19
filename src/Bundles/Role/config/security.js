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
    router.use( '/roles', function( req, res, next ) {
        if ( Controller.isProdEnv() ) {
            var token = req.token;

            access.restrict({
                mustBe: [ access.admin, access.director, access.teacher ],
                canRead: [],
                canCreate: [ access.admin ],
                canUpdate: [ access.admin ],
                canDelete: [ access.admin ]
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
