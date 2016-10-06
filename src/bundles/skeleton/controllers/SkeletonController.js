import { indexOf }  from 'lodash'
import Controller   from '~/vendor/easy/core/Controller'

/**
 * @class SkeletonController
 * @extends Controller
 */
export default class SkeletonController extends Controller {
    /**
     * @constructor
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {Factory} factory
     */
    constructor( req, res, factory ) {
        super( req, res, factory )

        this._skeletonRepository    = this.entityManager.getRepository( 'skeleton' )
        this._skeleton              = this.entityManager.getModel( 'skeleton' )
    }

    /**
     * isRequestWellParameterized - verify if request is contains valid params
     *
     * @returns {boolean}
     */
    isRequestWellParameterized() {
        return this.verifyParams([
            { property: 'property', typeExpected: 'string' }
        ])
    }

    /**
     * skeletonExists - check if skeleton exists (with id)
     *
     * @param {function} next
     */
    skeletonExists( next ) {
        const requireOptions = {
            requireBy: this.request.getRouteParameter( 'skeleton_id' ),
            options: {}
        }

        this.doesRequiredElementExists( 'skeleton', requireOptions )
        .then( skeleton => {
            this.request.define( 'skeleton', skeleton )
            next()
        })
        .catch( () => this.response.notFound() )
    }

    /**
     * getSkeletons - get all skeletons
     */
    getSkeletons() {
        this.skeletonRepository
            .findAll()
            .then( skeletons => this.response.ok( skeletons ) )
            .catch( error => this.response.internalServerError( error ) )
    }

    /**
     * createSkeleton - create new skeleton
     */
    createSkeleton() {
        if ( this.isRequestWellParameterized() ) {
            this.skeletonRepository
                .save( new this.skeleton(), this.request.getBody() )
                .then( skeleton => this.response.created( skeleton ) )
                .catch( error => this.response.internalServerError( error ) )
        } else {
            this.response.badRequest()
        }
    }

    /**
     * getSkeleton - get skeleton by id
     */
    getSkeleton() {
        this.response.ok( this.request.find( 'skeleton' ) )
    }

    /**
     * updateSkeleton - update skeleton by id
     */
    updateSkeleton() {
        if ( this.isRequestWellParameterized() ) {
            this.skeletonRepository
                .save( this.request.find( 'skeleton' ), this.request.getBody() )
                .then( skeleton => this.response.ok( skeleton ) )
                .catch( error => this.response.internalServerError( error ) )
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
                                    this.skeletonRepository
                                        .patch( this.request.find( 'skeleton' ), patch )
                                        .then( skeleton => {
                                            if ( ++currentPatch >= opsLength ) {
                                                // It's ok
                                                resolve( skeleton )
                                            }
                                        })
                                        .catch( reject )
                                }
                                break
                        }
                    })
                }
            })

            if ( patchRequestCorrectlyFormed ) {
                patchSkeleton
                    .then( skeleton => this.response.ok( skeleton ) )
                    .catch( error => this.response.internalServerError( error ) )
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
        this.skeletonRepository
            .delete( this.request.find( 'skeleton' ) )
            .then( () => this.response.noContent() )
            .catch( error => this.response.internalServerError( error ) )
    }

    /**
     * get - skeleton repository
     *
     * @returns {SkeletonRepository}
     */
    get skeletonRepository() {
        return this._skeletonRepository
    }

    /**
     * get - skeleton model
     *
     * @returns {Skeleton}
     */
    get skeleton() {
        return this._skeleton
    }
}
