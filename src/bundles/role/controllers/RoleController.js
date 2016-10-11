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
     * @param {function} next
     */
    roleExists( next ) {
        const requireOptions = {
            requireBy: this.request.getRouteParameter( 'role_id' ),
            options: {}
        }

        this.doesRequiredElementExists( 'role', requireOptions )
            .then( role => {
                this.request.define( 'role', role )
                next()
            })
            .catch( () => this.response.notFound() )
    }

    /**
     * getRoles - get all roles
     */
    getRoles( request, response ) {
        this.entityManager
            .getRepository( 'role' )
            .findAll()
            .then( roles => this.response.ok( roles ) )
            .catch( error => this.response.internalServerError( error ) )
    }

    /**
     * createRole - create new role
     */
    createRole() {
        if ( this.isRequestWellParameterized() ) {
            this.roleRepository
                .save( new this.roleModel(), this.request.getBody() )
                .then( role => this.response.created( role ) )
                .catch( error => this.response.internalServerError( error ) )
        } else {
            this.response.badRequest()
        }
    }

    /**
     * getRole - get role by id
     */
    getRole() {
        this.response.ok( this.request.find( 'role' ) )
    }

    /**
     * updateRole - update role
     */
    updateRole() {
        if ( this.isRequestWellParameterized() ) {
            this.roleRepository.save( this.request.find( 'role' ), this.request.getBody() )
            .then( role => this.response.ok( role ) )
            .catch( error => this.response.internalServerError( error ) )
        } else {
            this.response.badRequest()
        }
    }

    /**
     * deleteRole - delete role
     */
    deleteRole() {
        this.roleRepository.delete( this.request.find( 'role' ) )
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
     * get - role model
     *
     * @returns {Role}
     */
    get roleModel() {
        return this._roleModel
    }
}
