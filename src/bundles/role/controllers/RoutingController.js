function RoutingController( RoleFactory ) {
    /*
     * Global dependencies
     */
    var BundleManager       = RoleFactory.getBundleManager();
    var router              = BundleManager.getRouter();
    var database            = BundleManager.getDatabase();
    var Container  = BundleManager.getContainer();
    var http                = Container.getDependency( 'Http' );
    var Controller          = Container.getDependency( 'Controller' );
    var Request             = Container.getDependency( 'Request' );

    /*
     * Role bundle dependencies
     */
    var RoleRepository  = RoleFactory.getRepository();

    return {
        isRequestWellParameterized: function() {
            var Controller = RoleFactory.getVendorController();
            return Controller.verifyParams([
                    { property: 'name', typeExpected: 'string' },
                    { property: 'slug', typeExpected: 'string' }
                ], Request.getBody() );
        },

        getRoles: function() {
            RoleRepository.readAll()
            .then( function( roles ) {

                http.ok( roles.toJSON() );

            })
            .catch( function( error ) {
                http.internalServerError( error );
            });
        },

        createRole: function() {
            if ( this.isRequestWellParameterized() ) {

                database.transaction( function( t ) {

                    RoleRepository.save( RoleFactory.getNewModel(), Request.getBody(), { transacting: t } )
                    .then( function( role ) {

                        t.commit();
                        http.created( role.toJSON() );

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

        getRole: function() {
            http.ok( Request.find( 'role' ).toJSON() );
        },

        updateRole: function() {
            if ( this.isRequestWellParameterized() ) {

                database.transaction( function( t ) {

                    RoleRepository.save( Request.find( 'role' ), Request.getBody(), { transacting: t } )
                    .then( function( role ) {

                        t.commit();
                        http.ok( role.toJSON() );

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

        deleteRole: function() {
            database.transaction( function( t ) {

                RoleRepository.delete( Request.find( 'role' ), { transacting: t } )
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
