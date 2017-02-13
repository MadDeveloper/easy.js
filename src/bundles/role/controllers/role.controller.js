const { Controller } = require( 'easy/core' )

/**
 * @class RoleController
 * @extends Controller
 */
class RoleController extends Controller {
    /**
     * isRequestWellParameterized - verify if request contains valid params
     *
     * @param  {Request} request
     * @returns {boolean}
     */
    isRequestWellParameterized( request ) {
        return this.verifyParams([
            { property: 'name', typeExpected: 'string' },
            { property: 'slug', typeExpected: 'string' }
        ], request.getBody() )
    }

    /**
     * roleExists
     *
     * @param  {Request} request
     * @param  {Response} response
     * @param  {Function} next
     * @returns {Promise}
     */
    roleExists( request, response ) {
        const em = this.getEntityManager()
        const Role = em.getModel( 'role/entity/role' )

        return em
            .getRepository( 'role/entity/role.repository', { model: Role })
            .find( request.getRouteParameter( 'role_id' ), Role )
            .then( role => {
                if ( role ) {
                    request.store( 'role', role )
                    return Promise.resolve()
                } else {
                    response.notFound()
                    return Promise.reject()
                }
            })
            .catch( error => {
                response.internalServerError( error )
                return Promise.reject()
            })
    }

    /**
     * getRoles - get all roles
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    getRoles( request, response ) {
        this.getEntityManager()
            .getRepository( 'role/entity/role.repository', { model: 'role/entity/role' })
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
        if ( this.isRequestWellParameterized( request ) ) {
            const em = this.getEntityManager()
            const Role = em.getModel( 'role/entity/role' )

            em
                .getRepository( 'role/entity/role.repository', { model: Role })
                .save( new Role(), request.getBody() )
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
        response.ok( request.retrieve( 'role' ) )
    }

    /**
     * updateRole - update role
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    updateRole( request, response ) {
        if ( this.isRequestWellParameterized( request ) ) {
            this.getEntityManager()
                .getRepository( 'role/entity/role.repository', { model: 'role/entity/role' })
                .save( request.retrieve( 'role' ), request.getBody() )
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
        this.getEntityManager()
            .getRepository( 'role/entity/role.repository', { model: 'role/entity/role' })
            .delete( request.retrieve( 'role' ) )
            .then( () => response.noContent() )
            .catch( error => response.internalServerError( error ) )
    }
}

module.exports = RoleController
