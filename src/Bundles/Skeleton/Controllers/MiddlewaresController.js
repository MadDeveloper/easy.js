function MiddlewaresController( SkeletonFactory ) {
    /*
     * Global dependencies
     */
    var BundleManager       = SkeletonFactory.getBundleManager();
    var http                = BundleManager.getDependencyInjector().getDependency( 'Http' );
    var Controller          = BundleManager.getDependencyInjector().getDependency( 'Controller' );
    var Request             = BundleManager.getDependencyInjector().getDependency( 'Request' );

    return {
        skeletonExists: function() {
            return new Promise( function( resolve, reject ) {
                var requireOptions = {
                    requireBy: Request.getRouteParameter( 'id' ),
                    options: {}
                };

                Controller.doesRequiredElementExists( 'Skeleton', requireOptions, BundleManager, function( error, skeleton ) {
                    if ( skeleton ) {

                        Request.define( 'skeleton', skeleton );
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
