function RoutingController( UserFactory ) {
    /*
     * Global dependencies
     */
    var BundleManager       = UserFactory.getBundleManager();
    var router              = BundleManager.getRouter();
    var database            = BundleManager.getDatabase();
    var DependencyInjector  = BundleManager.getDependencyInjector();
    var http                = DependencyInjector.getDependency( 'Http' );
    var Controller          = DependencyInjector.getDependency( 'Controller' );
    var Request             = DependencyInjector.getDependency( 'Request' );
    var _                   = require( 'lodash' );

    /*
     * Current bundle dependencies
     */
    var UserRepository  = UserFactory.getRepository();
    var User            = UserFactory.getModel();

    /*
     * Associations dependencies
     */
    var RoleFactory     = BundleManager.getFactory( 'Role' );
    var RoleRepository  = RoleFactory.getRepository();

    return {
        /*
         * Useful (deletable)
         */
        isRequestWellParameterized: function() {
            var Controller = UserFactory.getVendorController();
            return Controller.verifyParams([
                    { property: 'username', typeExpected: 'string' },
                    { property: 'email', typeExpected: 'string' },
                    { property: 'password', typeExpected: 'string' },
                    { property: 'role_id', typeExpected: 'number', optional: true }
                ], Request.getBody() );
        },

        getUsers: function() {
            UserRepository.readAll( Request.find( 'role' ) )
            .then( function( users ) {

                http.ok( users.toJSON() );

            })
            .catch( function( error ) {
                http.internalServerError( error );
            });
        },

        createUser: function() {
            if ( this.isRequestWellParameterized() ) {

                database.transaction( function( t ) {

                    Request.setBodyParameter( 'role_id', Request.getRouteParameter( 'idRole' ) );

                    UserRepository.save( UserFactory.getNewModel(), Request.getBody(), { transacting: t } )
                    .then( function( user ) {
                        t.commit();
                        http.created( user.toJSON() );
                    })
                    .catch( function( error ) {
                        t.rollback();
                        http.internalServerError( error );
                    })

                });

            } else {
                http.badRequest();
            }
        },

        getUser: function() {
            http.ok( Request.find( 'user' ).toJSON() );
        },

        updateUser: function() {
            if ( this.isRequestWellParameterized() ) {

                database.transaction( function( t ) {

                    if ( typeof Request.getBodyParameter( 'role_id' ) === "undefined" ) {
                        Request.setBodyParameter( 'role_id', Request.getRouteParameter( 'idRole' ) );
                    }

                    UserRepository.save( Request.find( 'user' ), Request.getBody(), { transacting: t } )
                    .then( function( userUpdated ) {

                        t.commit();
                        http.ok( userUpdated.toJSON() );

                    })
                    .catch( function( error ) {
                        t.rollback();
                        http.internalServerError( error );
                    });

                });

            } else {
                http.badRequest();
            }
        },

        patchUser: function() {

        },

        deleteUser: function() {
            database.transaction( function( t ) {

                UserRepository.delete( Request.find( 'user' ), { transacting: t } )
                .then( function() {

                    t.commit();
                    http.noContent();

                })
                .catch( function( error ) {
                    t.rollback();
                    http.internalServerError( error );
                });

            });
        }
    }
}

module.exports = RoutingController;
