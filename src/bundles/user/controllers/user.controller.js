const { Controller } = require( 'easy/core' )
const { TokenManager } = require( 'easy/authentication' )

/**
 * @class UserController
 * @extends Controller
 */
class UserController extends Controller {
    /**
     * Verify if request contains valids params
     *
     * @param {Request} request
     * @returns {boolean}
     */
    isRequestWellParameterized( request ) {
        return this.verifyParams([
            { property: 'username', typeExpected: 'string' },
            { property: 'email', typeExpected: 'string' },
            { property: 'password', typeExpected: 'string' },
            { property: 'role_id', typeExpected: 'number', optional: true }
        ], request.getBody() )
    }

    /**
     * Check if the user exists
     *
     * @param {Request} request
     * @param {Response} response
     * @returns {boolean}
     */
    async userExists( request, response ) {
        try {
        	const userRepository = this.getEntityManager().getRepository( 'user/entity/user.repository', { model: 'user/entity/user' })
            const user = await userRepository.find( request.getRouteParameter( 'user_id' ) )

            if ( !user ) {
                response.notFound()

                return false
            }

            request.store( 'user', user )

            return true
        } catch ( error ) {
            response.internalServerError()
        }
    }

    /**
     * Get all users from specific role
     *
     * @param {Request} request
     * @param {Response} response
     */
    async getUsers( request, response ) {

        try {
			const userRepository = this.getEntityManager().getRepository( 'user/entity/user.repository', { model: 'user/entity/user' })
            const users = await userRepository.findAll( request.retrieve( 'role' ) )

            response.ok( users )
        } catch ( error ) {
            response.internalServerError()
        }
    }

    /**
     * Create new user
     *
     * @param {Request} request
     * @param {Response} response
     */
    async createUser( request, response ) {
        if ( this.isRequestWellParameterized( request ) ) {
            const em = this.getEntityManager()

            try {
				const User = em.getModel( 'user/entity/user' )
				const userRepository = em.getRepository( 'user/entity/user.repository', { model: User })
                const user = await userRepository.save( new User(), request.getBody() )

                user.unset( 'password' )
                response.created({ user: user.toJSON(), token: TokenManager.sign( user.toJSON() ) })
            } catch ( error ) {
                response.internalServerError()
            }

        } else {
            response.badRequest()
        }
    }

    /**
     * Get user by id
     *
     * @param {Request} request
     * @param {Response} response
     */
    getUser( request, response ) {
        response.ok( request.retrieve( 'user' ) )
    }

    /**
     * Update user
     *
     * @param {Request} request
     * @param {Response} response
     */
    async updateUser( request, response ) {
        if ( this.isRequestWellParameterized( request ) ) {
            if ( "undefined" === typeof request.retrieve( 'role_id' ) ) {
                request.store( 'role_id', request.getRouteParameter( 'role_id' ) )
            }

            try {
            	const userRepository = this.getEntityManager().getRepository( 'user/entity/user.repository', { model: 'user/entity/user' })
                const user = await userRepository.save( request.retrieve( 'user' ), request.getBody() )

                response.ok( user )
            } catch ( error ) {
                response.internalServerError()
            }
        } else {
            response.badRequest()
        }
    }

    /**
     * Patch user from specific properties
     *
     * @param {Request} request
     * @param {Response} response
     */
    async patchUser( request, response ) {
        if ( request.getRawBody().length > 0 ) {
            let ops = []
            let patchRequestCorrectlyFormed = true

            try {
                ops = JSON.parse( request.getRawBody() )
            } catch ( error ) {
                patchRequestCorrectlyFormed = false
            }

            let patchUser = () => new Promise( ( resolve, reject ) => {
                const validPaths = [ '/email', '/username', '/password', '/role_id' ]
                const opsLength = ops.length
                let currentPatch = 0

                if ( Array.isArray( ops ) && ops.length > 0 ) {
                    ops.forEach( async patch => {
                        if ( 'replace' === patch.op ) {
                            if ( validPaths.includes( patch.path ) ) {
                                try {
                                	const userRepository = this.getEntityManager().getRepository( 'user/entity/user.repository', { model: 'user/entity/user' })
                                    const user = await userRepository.patch( request.retrieve( 'user' ), patch )

                                    if ( ++currentPatch >= opsLength ) {
                                        // It's ok
                                        resolve( user )
                                    }
                                } catch ( error ) {
                                    reject({ message: error, type: 'server' })
                                }
                            } else {
                                reject({ type: 'user' })
                            }
                        }
                    })
                } else {
                    reject({ type: 'user' })
                }
            })

            if ( patchRequestCorrectlyFormed ) {
                try {
                    const user = await patchUser()

                    response.ok( user )
                } catch ( error ) {
                    if ( 'server' === error.type ) {
                        response.internalServerError()
                    } else {
                        response.badRequest()
                    }
                }
            } else {
                response.badRequest()
            }
        } else {
            response.badRequest()
        }
    }

    /**
     * Delete user
     *
     * @param {Request} request
     * @param {Response} response
     */
    async deleteUser( request, response ) {
        try {
        	const userRepository = this.getEntityManager().getRepository( 'user/entity/user.repository', { model: 'user/entity/user' })
            await userRepository.delete( request.retrieve( 'user' ) )

            response.noContent()
        } catch ( error ) {
            response.internalServerError()
        }
    }
}

module.exports = UserController
