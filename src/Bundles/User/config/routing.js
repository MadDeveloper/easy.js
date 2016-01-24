var routing = function( BundleManager, params ) {
    /*
     * Global dependencies
     */
    var router              = BundleManager.getRouter();

    /*
     * User bundle dependencies
     */
    var UserFactory = BundleManager.getFactory( 'User' );
    var UserRoutingController = UserFactory.getController( 'Routing' );

    /*
     * Middlewares
     */
    UserFactory.getConfig( 'security' );
    UserFactory.getConfig( 'middlewares' );

    /*
    * Routes definitions
    */
    router.route( '/roles/:idRole/users' )
        .get( function( req, res ) {
            UserRoutingController.getUsers();
        })
        .post( function( req, res ) {
            UserRoutingController.createUser();
        });

    router.route( '/roles/:idRole/users/:idUser' )
        .get( function( req, res ) {
            UserRoutingController.getUser();
        })
        .put( function( req, res ) {
            UserRoutingController.updateUser();
        })
        .patch( function( req, res ) {
            UserRoutingController.patchUser();
        })
        .delete( function( req, res ) {
            UserRoutingController.deleteUser();
        });
};

module.exports = routing;
