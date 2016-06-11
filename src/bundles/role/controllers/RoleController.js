import Controller from './../../../vendor/easy/core/Controller'

/**
 * @class RoleController
 */
export default class RoleController extends Controller {
    /**
     * @constructor
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {Factory} factory
     */
    constructor( req, res, factory ) {
        super( req, res, factory )

        this._roleRepository    = this.entityManager.getRepository( 'role' )
        this._roleModel         = this.entityManager.getModel( 'role' )
    }

    /**
     * isRequestWellParameterized - verify if request is contains valid params
     *
     * @returns {bool}
     */
    isRequestWellParameterized() {
        return this.verifyParams([
            { property: 'name', typeExpected: 'string' },
            { property: 'slug', typeExpected: 'string' }
        ])
    }

    getRoles( req, res ) {
        this.roleRepository.readAll()
        .then( roles => this.response.ok( roles ) )
        .catch( error => this.response.internalServerError( error ) )
    }

    createRole() {
        if ( this.isRequestWellParameterized() ) {
            this.roleRepository.save( new this.roleModel, this.request.getBody() )
            .then( role => {
                this.response.created( role )
            })
            .catch( error => this.response.internalServerError( error ) )
        } else {
            this.response.badRequest()
        }
    }

    getRole() {
        this.response.ok( this.request.find( 'role' ) )
    }

    updateRole() {
        if ( this.isRequestWellParameterized() ) {
            this.roleRepository.save( this.request.find( 'role' ), this.request.getBody() )
            .then( role => this.response.ok( role ) )
            .catch( error => this.response.internalServerError( error ) )
        } else {
            this.response.badRequest()
        }
    }

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
