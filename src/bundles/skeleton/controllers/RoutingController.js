import _ from 'lodash'
import Controller from './../../../vendor/easy/core/Controller'

export default class RoutingController extends Controller {
    constructor( skeletonFactory ) {
        super.constructor( skeletonFactory.container )

        this._skeletonFactory       = skeletonFactory
        this._skeletonRepository    = this._skeletonFactory.getRepository()
    }

    isRequestWellParameterized() {
        return this.verifyParams([
            { property: 'example', typeExpected: 'string' }
        ], this.request.getBody() )
    }

    getSkeletons() {
        this.skeletonRepository.readAll()
        .then( skeletons => {

            this.response.ok( skeletons.toJSON() )

        })
        .catch( error => {
            this.response.internalServerError( error )
        })
    }

    createSkeleton() {
        if ( this.isRequestWellParameterized() ) {

            this.database.transaction( t => {

                this.skeletonRepository.save( this.skeletonFactory.getNewModel(), this.request.getBody(), { transacting: t } )
                .then( skeleton => {

                    t.commit()
                    this.response.created( skeleton.toJSON() )

                })
                .catch( error => {
                    t.rollback()
                    this.response.internalServerError( error )
                })

            })

        } else {
            this.response.badRequest()
        }
    }

    getSkeleton() {
        this.response.ok( this.request.find( 'skeleton' ).toJSON() )
    }

    updateSkeleton() {
        if ( this.isRequestWellParameterized() ) {

            this.database.transaction( t => {

                this.skeletonRepository.save( this.request.find( 'skeleton' ), this.request.getBody(), { transacting: t } )
                .then( skeleton => {

                    t.commit()
                    this.response.ok( skeleton.toJSON() )

                })
                .catch( error => {
                    t.rollback()
                    this.response.internalServerError( error )
                })

            })

        } else {
            this.response.badRequest()
        }
    }

    patchSkeleton() {
        if ( this.isPatchRequestWellParameterized( this.request ) ) {
            let patchRequestCorrectlyFormed = false

            let patchSkeleton = new Promise( ( resolve, reject ) => {
                const validPaths = [ '/property' ]
                const ops = this.parsePatchParams( this.request.getScope() )

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

                    this.response.ok( skeleton.toJSON() )

                })
                .catch( error => {
                    this.response.internalServerError( error )
                })

            } else {
                this.response.badRequest()
            }

        } else {
            this.response.badRequest()
        }
    }

    deleteSkeleton() {
        this.database.transaction( t => {

            this.skeletonRepository.delete( this.request.find( 'skeleton' ), { transacting: t } )
            .then( () => {

                t.commit()
                this.response.noContent()

            })
            .catch( error => {
                t.rollback()
                this.response.internalServerError( error )
            })

        })
    }

    /*
     * Getters and setters
     */
    get skeletonFactory() {
        return this._skeletonFactory
    }

    get skeletonRepository() {
        return this._skeletonRepository
    }
}
