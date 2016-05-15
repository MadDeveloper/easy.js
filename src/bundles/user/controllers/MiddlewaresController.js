function MiddlewaresController( UserFactory ) {
    /*
     * Global dependencies
     */
    var BundleManager       = UserFactory.getBundleManager();
    var http                = BundleManager.getContainer().getComponent( 'Http' );
    var Controller          = BundleManager.getContainer().getComponent( 'Controller' );
    var Request             = BundleManager.getContainer().getComponent( 'Request' );

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
