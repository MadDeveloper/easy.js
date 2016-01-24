function RoutingController( SkeletonFactory ) {
    /*
     * Global dependencies
     */
    var BundleManager       = SkeletonFactory.getBundleManager();
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
    var SkeletonRepository  = SkeletonFactory.getRepository();
    var Skeleton            = SkeletonFactory.getModel();

    return {
        /*
         * Useful (deletable)
         */
        isRequestWellParameterized: function() {
            var Controller = SkeletonFactory.getVendorController();
            return Controller.verifyParams([
                    { property: 'example', typeExpected: 'string' }
                ], Request.getBody() );
        },

        getSkeletons: function() {
            SkeletonRepository.readAll()
            .then( function( skeletons ) {

                http.ok( skeletons.toJSON() );

            })
            .catch( function( error ) {
                http.internalServerError( error );
            });
        },

        createSkeleton: function() {
            if ( this.isRequestWellParameterized() ) {

                database.transaction( function( t ) {

                    SkeletonRepository.save( SkeletonFactory.getNewModel(), Request.getBody(), { transacting: t } )
                    .then( function( skeleton ) {

                        t.commit();
                        http.created( skeleton.toJSON() );

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

        getSkeleton: function() {
            http.ok( Request.find( 'skeleton' ).toJSON() );
        },

        updateSkeleton: function() {
            if ( this.isRequestWellParameterized() ) {

                database.transaction( function( t ) {

                    SkeletonRepository.save( Request.find( 'skeleton' ), Request.getBody(), { transacting: t } )
                    .then( function( skeletonUpdated ) {

                        t.commit();
                        http.ok( skeletonUpdated.toJSON() );

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

        patchSkeleton: function() {
            if ( Controller.isPatchRequestWellParameterized( req ) ) {
                var patchRequestCorrectlyFormed = false;

                var patchSkeleton = new Promise( function( resolve, reject ) {
                    var validPaths = [ '/property' ];
                    var ops = Controller.parsePatchParams( Request.getScope() );

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

                        http.ok( skeletonPatched.toJSON() );

                    })
                    .catch( function( error ) {
                        http.internalServerError( error );
                    });

                } else {
                    http.badRequest();
                }

            } else {
                http.badRequest();
            }
        },

        deleteSkeleton: function() {
            database.transaction( function( t ) {

                SkeletonRepository.delete( Request.find( 'skeleton' ), { transacting: t } )
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
