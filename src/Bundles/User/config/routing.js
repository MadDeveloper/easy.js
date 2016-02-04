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
        .get( UserRoutingController.getUsers )
        .post( UserRoutingController.createUser );

    router.route( '/roles/:idRole/users/:idUser' )
        .get( UserRoutingController.getUser )
        .put( UserRoutingController.updateUser )
        .patch( UserRoutingController.patchUser )
        .delete( UserRoutingController.deleteUser );
};

module.exports = routing;
