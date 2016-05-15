function MiddlewaresController( SkeletonFactory ) {
    /*
     * Global dependencies
     */
    var BundleManager       = SkeletonFactory.getBundleManager();
    var http                = BundleManager.getContainer().getDependency( 'Http' );
    var Controller          = BundleManager.getContainer().getDependency( 'Controller' );
    var Request             = BundleManager.getContainer().getDependency( 'Request' );

    return {
        skeletonExists: function() {
            return new Promise( function( resolve, reject ) {
                var requireOptions = {
                    requireBy: Request.getRouteParameter( 'id' ),
                    options: {}
                };

                Controller.doesRequiredElementExists( 'Skeleton', requireOptions, BundleManager, function( skeleton ) {
                    Request.define( 'skeleton', skeleton );
                    resolve();
                });
            });
        }
    }
}

module.exports = MiddlewaresController;
