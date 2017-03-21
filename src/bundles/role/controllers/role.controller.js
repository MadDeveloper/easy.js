const { Controller } = require( 'easy/core' )

/**
 * @class RoleController
 * @extends Controller
 */
class RoleController extends Controller {
    /**
     * Verify if request contains valid params
     *
     * @param {Request} request
     * @returns {boolean}
     */
    isRequestWellParameterized( request ) {
        return this.verifyParams([
            { property: 'name', typeExpected: 'string' },
            { property: 'slug', typeExpected: 'string' }
        ], request.getBody() )
    }

    /**
     * Check if the role exists
     *
     * @param {Request} request
     * @param {Response} response
     * @param {Function} next
     */
    async exists( request, response, next ) {
        const em = this.entityManager()

        try {
			const Role = em.model( 'role/entity/role' )
			const roleRepository = em.repository( 'role/entity/role.repository', { model: Role })
            const role = await roleRepository.find( request.getRouteParameter( 'role_id' ), Role )

            if ( !role ) {
                response.notFound()

                return
            }

            request.set( 'role', role )
            next()
        } catch ( error ) {
            response.internalServerError()
        }
    }

    /**
     * Get all roles
     *
     * @param {Request} request
     * @param {Response} response
     */
    async all( request, response ) {
        try {
			const roleRepository = this.entityManager().repository( 'role/entity/role.repository', { model: 'role/entity/role' })
            const roles = await roleRepository.findAll()

            response.ok( roles )
        } catch ( error ) {
            response.internalServerError()
        }
    }

    /**
     * Create new role
     *
     * @param {Request} request
     * @param {Response} response
     */
    async create( request, response ) {
        if ( this.isRequestWellParameterized( request ) ) {
            const em = this.entityManager()

            try {
				const Role = em.model( 'role/entity/role' )
				const roleRepository = em.repository( 'role/entity/role.repository', { model: Role })
                const role = await roleRepository.save( new Role(), request.getBody() )

                response.created( role )
            } catch ( error ) {
                response.internalServerError()
            }
        } else {
            response.badRequest()
        }
    }

    /**
     * Get role by id
     *
     * @param {Request} request
     * @param {Response} response
     */
    one( request, response ) {
        response.ok( request.get( 'role' ) )
    }

    /**
     * Update role
     *
     * @param {Request} request
     * @param {Response} response
     */
    async update( request, response ) {
        if ( this.isRequestWellParameterized( request ) ) {
            try {
				const roleRepository = this.entityManager().repository( 'role/entity/role.repository', { model: 'role/entity/role' })
                const role = await roleRepository.save( request.get( 'role' ), request.getBody() )

                response.ok( role )
            } catch ( error ) {
                response.internalServerError()
            }
        } else {
            response.badRequest()
        }
    }

    /**
     * Delete role
     *
     * @param {Request} request
     * @param {Response} response
     */
    async delete( request, response ) {
        try {
			const roleRepository = this.entityManager().repository( 'role/entity/role.repository', { model: 'role/entity/role' })

            await roleRepository.delete( request.get( 'role' ) )
            response.noContent()
        } catch ( error ) {
            response.internalServerError()
        }
    }
}

module.exports = RoleController
