import { indexOf }  from 'lodash'
import Controller   from './../../../vendor/easy/core/Controller'

/**
 * @class SkeletonRoutingController
 */
export default class SkeletonRoutingController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( factory ) {
        super( 'skeleton', factory )
    }

    /**
     * isRequestWellParameterized - verify if request is contains valid params
     *
     * @returns {bool}
     */
    isRequestWellParameterized() {
        return this.verifyParams([
            { property: 'example', typeExpected: 'string' }
        ], this.request.getBody() )
    }

    /**
     * getSkeletons - get all skeletons
     */
    getSkeletons() {
        this.getRepository().readAll()
        .then( skeletons => {
            this.response.ok( skeletons )
        })
        .catch( error => {
            this.response.internalServerError( error )
        })
    }

    /**
     * createSkeleton - create skeleton with params in request
     */
    createSkeleton() {
        if ( this.isRequestWellParameterized() ) {

            this.getRepository().save( new this.getRepository().getModel(), this.request.getBody() )
            .then( skeleton => {
                this.response.created( skeleton )
            })
            .catch( error => {
                this.response.internalServerError( error )
            })

        } else {
            this.response.badRequest()
        }
    }

    getSkeleton() {
        this.response.ok( this.request.find( 'skeleton' ) )
    }

    /**
     * updateSkeleton - update skeleton by id
     */
    updateSkeleton() {
        if ( this.isRequestWellParameterized() ) {
            this.getRepository().save( this.request.find( 'skeleton' ), this.request.getBody(), { transacting: t } )
            .then( skeleton => {
                this.response.ok( skeleton )
            })
            .catch( error => {
                this.response.internalServerError( error )
            })
        } else {
            this.response.badRequest()
        }
    }

    /**
     * patchSkeleton - patch skeleton by id (following RFC)
     */
    patchSkeleton() {
        if ( this.isPatchRequestWellParameterized() ) {
            let patchRequestCorrectlyFormed = false

            let patchSkeleton = new Promise( ( resolve, reject ) => {
                const validPaths = [ '/property' ]
                const ops = this.parsePatchParams()

                if ( ops ) {
                    patchRequestCorrectlyFormed = true
                    const opsLength = ops.length
                    let currentPatch = 0

                    ops.forEach( patch => {
                        switch ( patch.op ) {
                            case 'replace':
                                if ( indexOf( validPaths, patch.path ) >= 0 ) {
                                    this.getRepository().patch( this.request.find( 'skeleton' ), patch )
                                    .then( skeleton => {
                                        if ( ++currentPatch >= opsLength ) {
                                            // It's ok
                                            resolve( skeleton )
                                        }
                                    })
                                    .catch( error => {
                                        reject( error )
                                    })
                                }
                                break
                        }
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

    /**
     * deleteSkeleton - delete skeleton by id
     */
    deleteSkeleton() {
        this.getRepository().delete( this.request.find( 'skeleton' ) )
        .then( () => {
            this.response.noContent()
        })
        .catch( error => {
            this.response.internalServerError( error )
        })
    }
}
