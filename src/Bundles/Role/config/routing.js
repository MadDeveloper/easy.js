var routing = function( BundleManager, params ) {
    /*
     * Global dependencies
     */
    var router = BundleManager.getRouter();

    /*
     * Role bundle dependencies
     */
    var RoleFactory = BundleManager.getFactory( 'Role' );
    var RoleRoutingController = RoleFactory.getController( 'Routing' );

    /*
     * Middlewares
     */
    RoleFactory.getConfig( 'security' );
    RoleFactory.getConfig( 'middlewares' );

    /*
     * Routes definitions
     */
    router.route( '/roles' )
        .get( function( req, res ) {
            RoleRoutingController.getRoles();
        })
        .post( function( req, res ) {
            RoleRoutingController.createRole();
        });

    router.route( '/roles/:id' )
        .get( function( req, res ) {
            RoleRoutingController.getRole();
        })
        .put( function( req, res ) {
            RoleRoutingController.updateRole();
        })
        .delete( function( req, res ) {
            RoleRoutingController.deleteRole();
        });
};

module.exports = routing;
