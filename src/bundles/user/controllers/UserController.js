const { indexOf }   = require( 'lodash' )
const Controller   = require( 'vendor/easy/core/Controller' )
const TokenManager = require( 'vendor/easy/authentication/TokenManager' )

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
            .em
            .getRepository( 'user' )
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
        this.em
            .getRepository( 'user' )
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
            const User = this.em.getModel( 'user' )

            this.em
                .getRepository( 'user' )
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
            if ( typeof request.getAppParameter( 'role_id' ) === "undefined" ) {
                request.setAppParameter( 'role_id', request.getRouteParameter( 'role_id' ) )
            }

            this.em
                .getRepository( 'user' )
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
        if ( this.isPatchRequestWellParameterized() ) {
            let patchRequestCorrectlyFormed = false

            let patchUser = new Promise( ( resolve, reject ) => {
                const validPaths = [ '/email', '/username', '/password', '/role_id' ]
                const ops = this.parsePatchParams()

                if ( ops ) {
                    patchRequestCorrectlyFormed = true
                    const opsLength = ops.length
                    let currentPatch = 0

                    ops.forEach( patch => {
                        switch ( patch.op ) {
                            case 'replace':
                                if ( indexOf( validPaths, patch.path ) >= 0 ) {
                                    this.em
                                        .getRepository( 'user' )
                                        .patch( request.retrieve( 'user' ), patch )
                                        .then( user => {
                                            if ( ++currentPatch >= opsLength ) {
                                                // It's ok
                                                resolve( user )
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
                patchUser
                    .then( user => response.ok( user ) )
                    .catch( error => response.internalServerError( error ) )
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
        this.em
            .getRepository( 'user' )
            .delete( request.retrieve( 'user' ) )
            .then( () => response.noContent() )
            .catch( error => response.internalServerError( error ) )
    }
}

module.exports.UserController = UserController
