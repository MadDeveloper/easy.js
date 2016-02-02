function MiddlewaresController( UserFactory ) {
    /*
     * Global dependencies
     */
    var BundleManager       = UserFactory.getBundleManager();
    var http                = BundleManager.getDependencyInjector().getDependency( 'Http' );
    var Controller          = BundleManager.getDependencyInjector().getDependency( 'Controller' );
    var Request             = BundleManager.getDependencyInjector().getDependency( 'Request' );

    return {
        userExists: function() {
            return new Promise( function( resolve, reject ) {
                var requireOptions = {
                    requireBy: Request.getRouteParameter( 'idUser' ),
                    options: {}
                };

                Controller.doesRequiredElementExists( 'User', requireOptions, BundleManager, function( user ) {
                    Request.define( 'user', user );
                    resolve();
                });
            });
        }
    }
}

module.exports = MiddlewaresController;
