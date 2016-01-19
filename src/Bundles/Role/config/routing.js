var _       = require( 'lodash' );

var routing = function( BundleManager, params ) {
    /*
     * Global dependencies
     */
    var router              = BundleManager.getRouter();
    var database            = BundleManager.getDatabase();
    var DependencyInjector  = BundleManager.getDependencyInjector();
    var http                = DependencyInjector.getDependency( 'Http' );
    var Controller          = DependencyInjector.getDependency( 'Controller' );
    var Request             = DependencyInjector.getDependency( 'Request' );

    /*
     * Current bundle dependencies
     */
    var RoleFactory     = BundleManager.getFactory( 'Role' );
    var RoleController  = RoleFactory.getController();
    var RoleRepository  = RoleFactory.getRepository();
    var Role            = RoleFactory.getModel();

    /*
     * Middlewares
     */
    RoleFactory.getConfig( 'security' );
    RoleFactory.getConfig( 'middlewares' );

    /*
    * Routes definitions
    */
    router.route( '/roles' )
        .get( function( req, res ) {
            RoleRepository.readAll()
            .then( function( collection ) {

                http.ok( res, collection.toJSON() );

            })
            .catch( function( error ) {
                http.internalServerError( req, res, error );
            });
        })
        .post( function( req, res ) {
            if ( RoleController.isRequestWellParameterized( req.body ) ) {

                database.transaction( function( t ) {

                    RoleRepository.save( RoleFactory.getNewModel(), req.body, { transacting: t } )
                    .then( function( role ) {

                        t.commit();
                        http.created( res, role.toJSON() );

                    })
                    .catch( function( error ) {
                        t.rollback();
                        http.internalServerError( req, res, error );
                    });

                });

            } else {
                http.badRequest( res );
            }
        });

    router.route( '/roles/:id' )
        .get( function( req, res ) {
            http.ok( res, Request.find( 'role' ).toJSON() );
        })
        .put( function( req, res ) {
            if ( RoleController.isRequestWellParameterized( req.body ) ) {

                database.transaction( function( t ) {

                    RoleRepository.save( Request.find( 'role' ), req.body, { transacting: t } )
                    .then( function( roleUpdated ) {

                        t.commit();
                        http.ok( res, roleUpdated.toJSON() );

                    })
                    .catch( function( error ) {
                        t.rollback();
                        http.internalServerError( req, res, error );
                    })

                });

            } else {
                http.badRequest( res );
            }
        })
        .delete( function( req, res ) {
            database.transaction( function( t ) {

                RoleRepository.delete( Request.find( 'role' ), { transacting: t } )
                .then( function() {

                    t.commit();
                    http.noContent( res );

                })
                .catch( function( error) {
                    t.rollback();
                    http.internalServerError( req, res, error );
                });

            });
        });
};

module.exports = routing;
