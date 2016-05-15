function SecurityController( SkeletonFactory ) {
    /*
     * Global dependencies
     */
    var BundleManager       = SkeletonFactory.getBundleManager();
    var Container  = BundleManager.getContainer();
    var http                = Container.getDependency( 'Http' );
    var Controller          = Container.getDependency( 'Controller' );
    var Request             = Container.getDependency( 'Request' );
    var access              = Container.getService( 'security.access' )();

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

                    if ( access.focusOn( token.role_id ).canReach( Request.getMethod() ) ) {
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
