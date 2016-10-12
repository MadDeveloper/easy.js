import { indexOf }  from 'lodash'
import Controller   from '~/vendor/easy/core/Controller'

/**
 * @class SkeletonController
 * @extends Controller
 */
export class SkeletonController extends Controller {

    /**
     * isRequestWellParameterized - verify if request contains valid params
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
     * @param  {Request} request
     * @param  {Response} response
     * @returns  {Promise}
     */
    skeletonExists( request, response ) {
        return this.entityManager
            .getRepository( 'skeleton' )
            .find( request.getRouteParameter( 'skeleton_id' ) )
            .then( skeleton => {
                if ( skeleton ) {
                    request.store( 'skeleton', skeleton )
                    return Promise.resolve()
                } else {
                    response.notFound()
                    return Promise.reject()
                }
            })
            .catch( error => {
                response.badRequest()
                return Promise.reject()
            })
    }

    /**
     * getSkeletons - get all skeletons
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    getSkeletons( request, response ) {
        this.entityManager
            .getRepository( 'skeleton' )
            .findAll()
            .then( skeletons => response.ok( skeletons ) )
            .catch( error => response.internalServerError( error ) )
    }

    /**
     * createSkeleton - create new skeleton
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    createSkeleton( request, response ) {
        if ( this.isRequestWellParameterized() ) {
            this.entityManager
                .getRepository( 'skeleton' )
                .save( new this.skeleton(), request.getBody() )
                .then( skeleton => response.created( skeleton ) )
                .catch( error => response.internalServerError( error ) )
        } else {
            response.badRequest()
        }
    }

    /**
     * getSkeleton - get skeleton by id
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    getSkeleton( request, response ) {
        response.ok( request.retrieve( 'skeleton' ) )
    }

    /**
     * updateSkeleton - update skeleton by id
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    updateSkeleton( request, response ) {
        if ( this.isRequestWellParameterized() ) {
            this.entityManager
                .getRepository( 'skeleton' )
                .save( request.retrieve( 'skeleton' ), request.getBody() )
                .then( skeleton => response.ok( skeleton ) )
                .catch( error => response.internalServerError( error ) )
        } else {
            response.badRequest()
        }
    }

    /**
     * patchSkeleton - patch skeleton by id (following RFC)
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    patchSkeleton( request, response ) {
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
                                    this.entityManager
                                        .getRepository( 'skeleton' )
                                        .patch( request.retrieve( 'skeleton' ), patch )
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
                    .then( skeleton => response.ok( skeleton ) )
                    .catch( error => response.internalServerError( error ) )
            } else {
                response.badRequest()
            }
        } else {
            response.badRequest()
        }
    }

    /**
     * deleteSkeleton - delete skeleton by id
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    deleteSkeleton( request, response ) {
        this.entityManager
            .getRepository( 'skeleton' )
            .delete( request.retrieve( 'skeleton' ) )
            .then( () => response.noContent() )
            .catch( error => response.internalServerError( error ) )
    }
}
