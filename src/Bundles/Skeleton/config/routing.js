var _ = require( 'lodash' );

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
    var SkeletonFactory     = BundleManager.getFactory( 'Skeleton' );
    var SkeletonController  = SkeletonFactory.getController();
    var SkeletonRepository  = SkeletonFactory.getRepository();
    var Skeleton            = SkeletonFactory.getModel();

    /*
     * Middlewares
     */
    SkeletonFactory.getConfig( 'security' );
    SkeletonFactory.getConfig( 'middlewares' );

    /*
    * Routes definitions
    */
    router.route( '/skeletons' )
        .get( function( req, res ) {
            SkeletonRepository.readAll()
            .then( function( skeletons ) {

                http.ok( res, skeletons.toJSON() );

            })
            .catch( function( error ) {
                http.internalServerError( req, res, error );
            });
        })
        .post( function( req, res ) {
            if ( SkeletonController.isRequestWellParameterized( req.body ) ) {

                database.transaction( function( t ) {

                    SkeletonRepository.save( SkeletonFactory.getNewModel(), req.body, { transacting: t } )
                    .then( function( skeleton ) {

                        t.commit();
                        http.created( res, skeleton.toJSON() );

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

    router.route( '/skeletons/:id' )
        .get( function( req, res ) {
            http.ok( res, Request.find( 'skeleton' ).toJSON() );
        })
        .put( function( req, res ) {
            if ( SkeletonController.isRequestWellParameterized( req.body ) ) {

                database.transaction( function( t ) {

                    SkeletonRepository.save( Request.find( 'skeleton' ), req.body, { transacting: t } )
                    .then( function( skeletonUpdated ) {

                        t.commit();
                        http.ok( res, skeletonUpdated.toJSON() );

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
        .patch( function( req, res ) {
            if ( Controller.isPatchRequestWellParameterized( req ) ) {
                var patchRequestCorrectlyFormed = false;

                var patchSkeleton = new Promise( function( resolve, reject ) {
                    var validPaths = [ '/property' ];
                    var ops = Controller.parsePatchParams( req );

                    if ( ops ) {
                        patchRequestCorrectlyFormed = true;
                        var opsLength = ops.length;
                        var currentPatch = 0;

                        database.transaction( function( t ) {

                            ops.forEach( function( patch ) {
                                switch ( patch.op ) {
                                    case 'replace':
                                        if ( _.indexOf( validPaths, patch.path ) >= 0 ) {
                                            SkeletonRepository.patch( Request.find( 'skeleton' ), patch, { transacting: t, patch: true } )
                                            .then( function( skeletonPatched ) {
                                                if ( ++currentPatch >= opsLength ) {
                                                    // It's ok
                                                    t.commit();
                                                    resolve( skeletonPatched );
                                                }
                                            })
                                            .catch( function( error ) {
                                                t.rollback();
                                                reject( error );
                                            });
                                        }
                                        break;
                                }
                            });

                        });
                    }
                });

                if ( patchRequestCorrectlyFormed ) {

                    patchSkeleton
                    .then( function( skeletonPatched ) {

                        http.ok( res, skeletonPatched.toJSON() );

                    })
                    .catch( function( error ) {
                        http.internalServerError( req, res, error );
                    });

                } else {
                    http.badRequest( res );
                }

            } else {
                http.badRequest( res );
            }
        })
        .delete( function( req, res ) {
            database.transaction( function( t ) {

                SkeletonRepository.delete( Request.find( 'skeleton' ), { transacting: t } )
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
