const { indexOf } = require( 'lodash' )
const { Controller } = require( 'easy/core' )
const { TokenManager } = require( 'easy/authentication' )

/**
 * @class UserController
 * @extends Controller
 */
class UserController extends Controller {
    /**
     * isRequestWellParameterized - verify if request contains valids params
     *
     * @param  {Request} request
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
     * userExists
     *
     * @param  {Request} request
     * @param  {Response} response
     * @returns  {Promise}
     */
    userExists( request, response ) {
        return this
            .getEntityManager()
            .getRepository( 'user/entity/user.repository', { model: 'user/entity/user' })
            .find( request.getRouteParameter( 'user_id' ) )
            .then( user => {
                if ( user ) {
                    request.store( 'user', user )
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
     * getUsers - get all users from specific role
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    getUsers( request, response ) {
        this.getEntityManager()
            .getRepository( 'user/entity/user.repository', { model: 'user/entity/user' })
            .findAll( request.retrieve( 'role' ) )
            .then( users => response.ok( users ) )
            .catch( error => response.internalServerError( error ) )
    }

    /**
     * createUser - create new user
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    createUser( request, response ) {
        if ( this.isRequestWellParameterized( request ) ) {
            const em = this.getEntityManager()
            const User = em.getModel( 'user/entity/user' )

            em
                .getRepository( 'user/entity/user.repository', { model: User })
                .save( new User(), request.getBody() )
                .then( user => {
                    user.unset( 'password' )
                    response.created({ user: user.toJSON(), token: TokenManager.sign( user.toJSON() ) })
                })
                .catch( error => response.internalServerError( error ) )
        } else {
            response.badRequest()
        }
    }

    /**
     * getUser - get user by id
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    getUser( request, response ) {
        response.ok( request.retrieve( 'user' ) )
    }

    /**
     * updateUser - update user
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    updateUser( request, response ) {
        if ( this.isRequestWellParameterized( request ) ) {
            if ( "undefined" === typeof request.getAppParameter( 'role_id' ) ) {
                request.setAppParameter( 'role_id', request.getRouteParameter( 'role_id' ) )
            }

            this.getEntityManager()
                .getRepository( 'user/entity/user.repository', { model: 'user/entity/user' })
                .save( request.retrieve( 'user' ), request.getBody() )
                .then( user => response.ok( user ) )
                .catch( error => response.internalServerError( error ) )
        } else {
            response.badRequest()
        }
    }

    /**
     * patchUser - patch user from specific properties
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    patchUser( request, response ) {
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
                    ops.forEach( patch => {
                        if ( 'replace' === patch.op ) {
                            if ( validPaths.includes( patch.path ) ) {
                                this.getEntityManager()
                                    .getRepository( 'user/entity/user.repository', { model: 'user/entity/user' })
                                    .patch( request.retrieve( 'user' ), patch )
                                    .then( user => {
                                        if ( ++currentPatch >= opsLength ) {
                                            // It's ok
                                            resolve( user )
                                        }
                                    })
                                    .catch( error => reject({ message: error, type: 'server' }) )
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
                patchUser()
                    .then( user => response.ok( user ) )
                    .catch( error => {
                        if ( 'server' === error.type ) {
                            response.internalServerError()
                        } else {
                            response.badRequest()
                        }
                    })
            } else {
                response.badRequest()
            }
        } else {
            response.badRequest()
        }
    }

    /**
     * deleteUser - delete user
     *
     * @param  {Request} request
     * @param  {Response} response
     */
    deleteUser( request, response ) {
        this.getEntityManager()
            .getRepository( 'user/entity/user.repository', { model: 'user/entity/user' })
            .delete( request.retrieve( 'user' ) )
            .then( () => response.noContent() )
            .catch( error => response.internalServerError( error ) )
    }
}

module.exports = UserController
