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
    var UserFactory     = BundleManager.getFactory( 'User' );
    var UserController  = UserFactory.getController();
    var UserRepository  = UserFactory.getRepository();
    var User            = UserFactory.getModel();

    /*
     * Associations dependencies
     */
    var RoleFactory     = BundleManager.getFactory( 'Role' );
    var RoleRepository  = RoleFactory.getRepository();

    /*
     * Middlewares
     */
    UserFactory.getConfig( 'security' );
    UserFactory.getConfig( 'middlewares' );

    /*
    * Routes definitions
    */
    router.route( '/roles/:idRole/users' )
        .get( function( req, res ) {
            UserRepository.readAll( Request.find( 'role' ) )
            .then( function( users ) {

                http.ok( res, users.toJSON() );

            })
            .catch( function( error ) {
                http.internalServerError( req, res, error );
            });
        })
        .post( function( req, res ) {
            if ( UserController.isRequestWellParameterized( req.body ) ) {

                database.transaction( function( t ) {

                    req.body.role_id = req.params.idRole;

                    UserRepository.save( UserFactory.getNewModel(), req.body, { transacting: t } )
                    .then( function( user ) {
                        t.commit();
                        http.created( res, user.toJSON() );
                    })
                    .catch( function( error ) {
                        t.rollback();
                        http.internalServerError( req, res, error );
                    })

                });

            } else {
                http.badRequest( res );
            }
        });

    router.route( '/roles/:idRole/users/:idUser' )
        .get( function( req, res ) {
            http.ok( res, Request.find( 'user' ).toJSON() );
        })
        .put( function( req, res ) {
            if ( UserController.isRequestWellParameterized( req.body ) ) {

                database.transaction( function( t ) {

                    if ( typeof req.body.role_id === "undefined" ) {
                        req.body.role_id = req.params.idRole;
                    }

                    UserRepository.save( Request.find( 'user' ), req.body, { transacting: t } )
                    .then( function( userUpdated ) {

                        t.commit();
                        http.ok( res, userUpdated.toJSON() );

                    })
                    .catch( function( error ) {
                        t.rollback();
                        http.internalServerError( req, res, error );
                    });

                });

            } else {
                http.badRequest( res );
            }
    })
    .delete( function( req, res ) {
        database.transaction( function( t ) {

            UserRepository.delete( Request.find( 'user' ), { transacting: t } )
            .then( function() {

                t.commit();
                http.noContent( res );

            })
            .catch( function( error ) {
                t.rollback();
                http.internalServerError( req, res, error );
            });

        });
    });
};

module.exports = routing;
