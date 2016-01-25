function SecurityController( SkeletonFactory ) {
    /*
     * Global dependencies
     */
    var DependencyInjector  = BundleManager.getDependencyInjector();
    var http                = DependencyInjector.getDependency( 'Http' );
    var Controller          = DependencyInjector.getDependency( 'Controller' );
    var Request             = DependencyInjector.getDependency( 'Request' );
    var access              = DependencyInjector.getService( 'security.access' )();

    return {
        authorize: function() {
            return new Promise( function( resolve, reject ) {
                if ( Controller.isProdEnv() ) {
                    var token = Request.getBodyParameter( 'token' );

                    access.restrict({
                        mustBe: [ access.any ],
                        canCreate: [],
                        canRead: [],
                        canUpdate: [],
                        canDelete: []
                    });

                    if ( access.focusOn( token.role_id ).canReach( Request.getScope() ) ) {
                        resolve();
                    } else {
                        http.forbidden();
                        reject();
                    }
                } else {
                    resolve();
                }
            });
        }
    }
}

module.exports = SecurityController;
