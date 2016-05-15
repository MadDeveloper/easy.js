function SecurityController( UserFactory ) {
    /*
     * Global dependencies
     */
    var BundleManager       = UserFactory.getBundleManager();
    var Container  = BundleManager.getContainer();
    var http                = Container.getComponent( 'Http' );
    var Controller          = Container.getComponent( 'Controller' );
    var Request             = Container.getComponent( 'Request' );
    var access              = Container.getService( 'security.access' )();

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
