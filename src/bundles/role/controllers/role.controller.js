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
     * @returns {boolean}
     */
    async roleExists( request, response ) {
        const em = this.getEntityManager()
        const Role = em.getModel( 'role/entity/role' )
        const roleRepository = em.getRepository( 'role/entity/role.repository', { model: Role })

        try {
            const role = await roleRepository.find( request.getRouteParameter( 'role_id' ), Role )

            if ( !role ) {
                response.notFound()

                return false
            }

            request.store( 'role', role )

            return true
        } catch ( error ) {
            response.internalServerError( error )

            return false
        }
    }

    /**
     * getRoles - get all roles
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    async getRoles( request, response ) {
        const roleRepository = this.getEntityManager().getRepository( 'role/entity/role.repository', { model: 'role/entity/role' })

        try {
            const roles = await roleRepository.findAll()
            response.ok( roles )
        } catch ( error ) {
            response.internalServerError( error )
        }
    }

    /**
     * createRole - create new role
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    async createRole( request, response ) {
        if ( this.isRequestWellParameterized( request ) ) {
            const em = this.getEntityManager()
            const Role = em.getModel( 'role/entity/role' )
            const roleRepository = em.getRepository( 'role/entity/role.repository', { model: Role })

            try {
                const role = await roleRepository.save( new Role(), request.getBody() )

                response.created( role )
            } catch ( error ) {
                response.internalServerError( error )
            }
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
    async updateRole( request, response ) {
        if ( this.isRequestWellParameterized( request ) ) {
            const roleRepository = this.getEntityManager().getRepository( 'role/entity/role.repository', { model: 'role/entity/role' })
            try {
                const role = await roleRepository.save( request.retrieve( 'role' ), request.getBody() )

                response.ok( role )
            } catch ( error ) {
                response.internalServerError( error )
            }
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
    async deleteRole( request, response ) {
        const roleRepository = this.getEntityManager().getRepository( 'role/entity/role.repository', { model: 'role/entity/role' })

        try {
            await roleRepository.delete( request.retrieve( 'role' ) )
            response.noContent()
        } catch ( error ) {
            response.internalServerError( error )
        }
    }
}

module.exports = RoleController
