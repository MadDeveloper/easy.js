import Controller from '~/vendor/easy/core/Controller'

/**
 * @class RoleController
 * @extends Controller
 */
export class RoleController extends Controller {
    /**
     * isRequestWellParameterized - verify if request contains valid params
     *
     * @returns {boolean}
     */
    isRequestWellParameterized() {
        return this.verifyParams([
            { property: 'name', typeExpected: 'string' },
            { property: 'slug', typeExpected: 'string' }
        ])
    }

    /**
     * roleExists
     *
     * @param  {Request} request
     * @param  {Response} response
     * @returns {Promise}
     */
    roleExists( request, response ) {
        return Promise.resolve()
        // const requireOptions = {
        //     requireBy: this.request.getRouteParameter( 'role_id' ),
        //     options: {}
        // }
        //
        // return this.doesRequiredElementExists( 'role', requireOptions )
        //     .then( role => {
        //         request.store( 'role', role )
        //         next()
        //     })
        //     .catch( () => this.response.notFound() )
    }

    /**
     * getRoles - get all roles
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    getRoles( request, response ) {
        this.entityManager
            .getRepository( 'role' )
            .findAll()
            .then( roles => response.ok( roles ) )
            .catch( error => response.internalServerError( error ) )
    }

    /**
     * createRole - create new role
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    createRole( request, response ) {
        if ( this.isRequestWellParameterized() ) {
            this.entityManager
                .getRepository( 'role' )
                .save( new this.roleModel(), request.getBody() )
                .then( role => response.created( role ) )
                .catch( error => response.internalServerError( error ) )
        } else {
            response.badRequest()
        }
    }

    /**
     * getRole - get role by id
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    getRole( request, response ) {
        response.ok( request.find( 'role' ) )
    }

    /**
     * updateRole - update role
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    updateRole( request, response ) {
        if ( this.isRequestWellParameterized() ) {
            this.entityManager
                .getRepository( 'role' )
                .save( request.find( 'role' ), request.getBody() )
                .then( role => response.ok( role ) )
                .catch( error => response.internalServerError( error ) )
        } else {
            response.badRequest()
        }
    }

    /**
     * deleteRole - delete role
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    deleteRole( request, response ) {
        this.roleRepository
            .delete( request.find( 'role' ) )
            .then( () => response.noContent() )
            .catch( error => response.internalServerError( error ) )
    }
}
