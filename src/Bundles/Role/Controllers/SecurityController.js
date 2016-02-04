function SecurityController( RoleFactory ) {
    /*
     * Global dependencies
     */
    var BundleManager       = RoleFactory.getBundleManager();
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
                        canCreate: [ access.admin ],
                        canRead: [],
                        canUpdate: [ access.admin ],
                        canDelete: [ access.admin ]
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
