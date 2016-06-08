import Controller from './../../../vendor/easy/core/Controller'

export default class RoleRoutingController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( req, res, factory ) {
        super( req, res, factory )

        this._roleRepository    = this.entityManager.getRepository( 'role' )
        this._roleModel         = this.entityManager.getModel( 'role' )
    }

    isRequestWellParameterized() {
        return this.verifyParams([
            { property: 'name', typeExpected: 'string' },
            { property: 'slug', typeExpected: 'string' }
        ], this.request.getBody() )
    }

    getRoles( req, res ) {
        this.roleRepository.readAll()
        .then( roles => {
            this.response.ok( roles )
            // res.status(200).json(roles)
        })
        .catch( error => {
            this.response.internalServerError( error )
            // res.status(500).end()
        })
    }

    createRole() {
        if ( this.isRequestWellParameterized() ) {
            this.roleRepository.save( new this.roleModel, this.request.getBody() )
            .then( role => {
                this.response.created( role )
            })
            .catch( error => {
                this.response.internalServerError( error )
            })
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
            .then( role => {
                this.response.ok( role )
            })
            .catch( error => {
                this.response.internalServerError( error )
            })
        } else {
            this.response.badRequest()
        }
    }

    deleteRole() {
        this.roleRepository.delete( this.request.find( 'role' ) )
        .then( () => {
            this.response.noContent()
        })
        .catch( error => {
            this.response.internalServerError( error )
        })
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
