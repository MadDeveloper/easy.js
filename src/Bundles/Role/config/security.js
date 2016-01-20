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
     * Security/Access middlewares
     */
    router.use( '/roles', function( req, res, next ) {
        if ( Controller.isProdEnv() ) {
            var token = req.token;

            access.restrict({
                mustBe: [ access.any ],
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

    /*
     * We verify if user which is not an admin doesn't want to edit/delete Administrator role
     */
    router.use( '/roles/:id', function( req, res, next ) {
        var forbiddenMethodsOnAdmin = [ 'put, patch, delete' ];
        var token = req.token;

        if ( Controller.isProdEnv() ) {
            if ( req.params.id === access.admin && token.role_id !== access.admin && _.indexOf( forbiddenMethodsOnAdmin, req.method.toLowerCase() ) !== -1 ) {
                http.forbidden( res );
            } else {
                next();
            }
        } else {
            next();
        }
    });
};

module.exports = security;
