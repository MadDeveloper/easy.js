function RoutingController( SkeletonFactory ) {
    /*
     * Global dependencies
     */
    var BundleManager       = SkeletonFactory.getBundleManager();
    var router              = BundleManager.getRouter();
    var database            = BundleManager.getDatabase();
    var Container  = BundleManager.getContainer();
    var http                = Container.getDependency( 'Http' );
    var Controller          = Container.getDependency( 'Controller' );
    var Request             = Container.getDependency( 'Request' );
    var _                   = require( 'lodash' );

    /*
     * Skeleton bundle dependencies
     */
    var SkeletonRepository  = SkeletonFactory.getRepository();

    return {
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
                    .then( function( skeleton ) {

                        t.commit();
                        http.ok( skeleton.toJSON() );

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
                                            .then( function( skeleton ) {
                                                if ( ++currentPatch >= opsLength ) {
                                                    // It's ok
                                                    t.commit();
                                                    resolve( skeleton );
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
                    .then( function( skeleton ) {

                        http.ok( skeleton.toJSON() );

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
