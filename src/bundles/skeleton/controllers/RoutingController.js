import _ from 'lodash'

export default class RoutingController {
    constructor( skeletonFactory ) {
        this._skeletonFactory       = skeletonFactory
        this._bundleManager         = this._skeletonFactory.bundleManager
        this._router                = this._bundleManager.router
        this._database              = this._bundleManager.database
        this._container             = this._bundleManager.container
        this._http                  = this._container.getComponent( 'Http' )
        this._controller            = this._container.getComponent( 'Controller' )
        this._request               = this._container.getComponent( 'Request' )
        this._skeletonRepository    = this._skeletonFactory.getRepository()
    }

    isRequestWellParameterized() {
        return this.controller.verifyParams([
            { property: 'example', typeExpected: 'string' }
        ], this.request.getBody() )
    }

    getSkeletons() {
        this.skeletonRepository.readAll()
        .then( skeletons => {

            http.ok( skeletons.toJSON() )

        })
        .catch( error => {
            http.internalServerError( error )
        })
    }

    createSkeleton() {
        if ( this.isRequestWellParameterized() ) {

            this.database.transaction( t => {

                this.skeletonRepository.save( this.skeletonFactory.getNewModel(), this.request.getBody(), { transacting: t } )
                .then( skeleton => {

                    t.commit()
                    http.created( skeleton.toJSON() )

                })
                .catch( error => {
                    t.rollback()
                    http.internalServerError( error )
                })

            })

        } else {
            http.badRequest()
        }
    }

    getSkeleton() {
        http.ok( this.request.find( 'skeleton' ).toJSON() )
    }

    updateSkeleton() {
        if ( this.isRequestWellParameterized() ) {

            this.database.transaction( t => {

                this.skeletonRepository.save( this.request.find( 'skeleton' ), this.request.getBody(), { transacting: t } )
                .then( skeleton => {

                    t.commit()
                    http.ok( skeleton.toJSON() )

                })
                .catch( error => {
                    t.rollback()
                    http.internalServerError( error )
                })

            })

        } else {
            http.badRequest()
        }
    }

    patchSkeleton() {
        if ( this.controller.isPatchRequestWellParameterized( req ) ) {
            let patchRequestCorrectlyFormed = false

            let patchSkeleton = new Promise( ( resolve, reject ) => {
                const validPaths = [ '/property' ]
                const ops = this.controller.parsePatchParams( this.request.getScope() )

                if ( ops ) {
                    patchRequestCorrectlyFormed = true
                    const opsLength = ops.length
                    let currentPatch = 0

                    this.database.transaction( t => {

                        ops.forEach( patch => {
                            switch ( patch.op ) {
                                case 'replace':
                                    if ( _.indexOf( validPaths, patch.path ) >= 0 ) {
                                        this.skeletonRepository.patch( this.request.find( 'skeleton' ), patch, { transacting: t, patch: true } )
                                        .then( skeleton => {
                                            if ( ++currentPatch >= opsLength ) {
                                                // It's ok
                                                t.commit()
                                                resolve( skeleton )
                                            }
                                        })
                                        .catch( error => {
                                            t.rollback()
                                            reject( error )
                                        })
                                    }
                                    break
                            }
                        })

                    })
                }
            })

            if ( patchRequestCorrectlyFormed ) {

                patchSkeleton
                .then( skeleton => {

                    http.ok( skeleton.toJSON() )

                })
                .catch( error => {
                    http.internalServerError( error )
                })

            } else {
                http.badRequest()
            }

        } else {
            http.badRequest()
        }
    }

    deleteSkeleton() {
        this.database.transaction( t => {

            this.skeletonRepository.delete( this.request.find( 'skeleton' ), { transacting: t } )
            .then( () => {

                t.commit()
                http.noContent()

            })
            .catch( error => {
                t.rollback()
                http.internalServerError( error )
            })

        })
    }

    /*
     * Getters and setters
     */
    get skeletonFactory() {
        return this._skeletonFactory
    }

    get bundleManager() {
        return this._bundleManager
    }

    get router() {
        return this._router
    }

    get database() {
        return this._database
    }

    get container() {
        return this._container
    }

    get http() {
        return this._http
    }

    get controller() {
        return this._controller
    }

    get request() {
        return this._request
    }

    get skeletonRepository() {
        return this._skeletonRepository
    }
}
