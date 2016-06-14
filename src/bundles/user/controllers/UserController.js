import Controller   from '~/vendor/easy/core/Controller'

/**
 * @class UserController
 */
export default class UserController extends Controller {
    /**
     * @constructor
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {Factory} factory
     */
    constructor( req, res, factory ) {
        super( req, res, factory )

        this._userRepository    = this.entityManager.getRepository( 'user' )
        this._roleRepository    = this.entityManager.getRepository( 'role' )
    }

    /**
     * isRequestWellParameterized - verify if request is contains valid params
     *
     * @returns {bool}
     */
    isRequestWellParameterized() {
        return this.verifyParams([
            { property: 'username', typeExpected: 'string' },
            { property: 'email', typeExpected: 'string' },
            { property: 'password', typeExpected: 'string' },
            { property: 'role_id', typeExpected: 'number', optional: true }
        ])
    }

    /**
     * getUsers - get all users from specific role
     *
     * @returns {type}  description
     */
    getUsers() {
        this.userRepository.readAll( this.request.find( 'role' ) )
        .then( users => this.response.ok( users ) )
        .catch( error => this.response.internalServerError( error ) )
    }

    /**
     * createUser - create new user with specific role id
     *
     * @returns {type}  description
     */
    createUser() {
        if ( this.isRequestWellParameterized() ) {
            this.request.setBodyParameter( 'role_id', this.request.getRouteParameter( 'idRole' ) )

            this.userRepository.save( new this.userModel, this.request.getBody() )
            .then( user => this.response.created( user ) )
            .catch( error => this.response.internalServerError( error ) )
        } else {
            this.response.badRequest()
        }
    }

    /**
     * getUser - get specific user from id
     */
    getUser() {
        this.response.ok( this.request.find( 'user' ) )
    }

    /**
     * updateUser - update user
     */
    updateUser() {
        if ( this.isRequestWellParameterized() ) {
            if ( typeof this.request.getBodyParameter( 'role_id' ) === "undefined" ) {
                this.request.setBodyParameter( 'role_id', this.request.getRouteParameter( 'idRole' ) )
            }

            this.userRepository.save( this.request.find( 'user' ), this.request.getBody() )
            .then( user => this.response.ok( user ) )
            .catch( error => this.response.internalServerError( error ) )
        } else {
            this.response.badRequest()
        }
    }

    /**
     * patchUser - patch user from specific properties
     */
    patchUser() {

    }

    /**
     * deleteUser - delete user
     */
    deleteUser() {
        this.userRepository.delete( this.request.find( 'user' ) )
        .then( () => this.response.noContent() )
        .catch( error => this.response.internalServerError( error ) )
    }

    /**
     * get - role repository
     *
     * @returns {RoleRepository}
     */
    get roleRepository() {
        return this._roleRepository
    }

    /**
     * get - user repository
     *
     * @returns {UserRepository}
     */
    get userRepository() {
        return this._userRepository
    }

    /**
     * get - user model
     *
     * @returns {User}
     */
    get userModel() {
        return this._userModel
    }
}
