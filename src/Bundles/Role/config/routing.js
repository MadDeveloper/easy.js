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
        .get( function() {
        	RoleRoutingController.getRoles();
        })
        .post( function() {
        	RoleRoutingController.createRole();
        });

    router.route( '/roles/:id' )
        .get( function() {
        	RoleRoutingController.getRole();
        })
        .put( function() {
        	RoleRoutingController.updateRole();
        })
        .delete( function() {
        	RoleRoutingController.deleteRole();
        });
};

module.exports = routing;
