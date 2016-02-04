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
        .get( RoleRoutingController.getRoles )
        .post( RoleRoutingController.createRole );

    router.route( '/roles/:id' )
        .get( RoleRoutingController.getRole )
        .put( RoleRoutingController.updateRole )
        .delete( RoleRoutingController.deleteRole );
};

module.exports = routing;
