function MiddlewaresController( RoleFactory ) {
    /*
     * Global dependencies
     */
    var BundleManager       = RoleFactory.getBundleManager();
    var http                = BundleManager.getDependencyInjector().getDependency( 'Http' );
    var Controller          = BundleManager.getDependencyInjector().getDependency( 'Controller' );
    var Request             = BundleManager.getDependencyInjector().getDependency( 'Request' );

    return {
        roleExists: function() {
            return new Promise( function( resolve, reject ) {
                var requireOptions = {
                    requireBy: Request.getRouteParameter( 'id' ),
                    options: {}
                };

                Controller.doesRequiredElementExists( 'Role', requireOptions, BundleManager, function( error, role ) {
                    if ( role ) {

                        Request.define( 'role', role );
                        resolve();

                    } else {
                        if ( 'internalServerError' === error.type ) {
                            http.internalServerError( error.exactly );
                        } else {
                            http[ error.type ]();
                        }
                        reject();
                    }
                });
            });
        }
    }
}

module.exports = MiddlewaresController;
