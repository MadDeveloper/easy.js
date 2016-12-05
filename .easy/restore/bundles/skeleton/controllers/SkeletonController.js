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
     * @param  {Request} request
     * @returns {boolean}
     */
    isRequestWellParameterized( request ) {
        return this.verifyParams([
            { property: 'property', typeExpected: 'string' }
        ], request )
    }

    /**
     * skeletonExists - check if skeleton exists (with id)
     *
     * @param  {Request} request
     * @param  {Response} response
     * @returns  {Promise}
     */
    skeletonExists( request, response ) {
        return this
            .em
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
        this.em
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
        if ( this.isRequestWellParameterized( request ) ) {
            this.em
                .getRepository( 'skeleton' )
                .save( this.em.getNewModel( 'skeleton' ), request.getBody() )
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
        if ( this.isRequestWellParameterized( request ) ) {
            this.em
                .getRepository( 'skeleton' )
                .save( request.retrieve( 'skeleton' ), request.getBody() )
                .then( skeleton => response.ok( skeleton ) )
                .catch( error => response.internalServerError( error ) )
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
        this.em
            .getRepository( 'skeleton' )
            .delete( request.retrieve( 'skeleton' ) )
            .then( () => response.noContent() )
            .catch( error => response.internalServerError( error ) )
    }
}
