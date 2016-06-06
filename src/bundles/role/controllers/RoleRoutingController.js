import Controller from './../../../vendor/easy/core/Controller'

export default class RoleRoutingController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( factory ) {
        super( 'role', factory )
    }

    isRequestWellParameterized() {
        return this.verifyParams([
            { property: 'name', typeExpected: 'string' },
            { property: 'slug', typeExpected: 'string' }
        ], this.request.getBody() )
    }

    getRoles() {
        this.getRepository().readAll()
        .then( roles => {
            this.response.ok( roles )
        })
        .catch( error => {
            this.response.internalServerError( error )
        })
    }

    createRole() {
        if ( this.isRequestWellParameterized() ) {
            this.getRepository().save( new this.getRepository().getModel(), this.request.getBody() )
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
            this.getRepository().save( this.request.find( 'role' ), this.request.getBody() )
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
        this.getRepository().delete( this.request.find( 'role' ) )
        .then( () => {
            this.response.noContent()

        })
        .catch( error => {
            this.response.internalServerError( error )
        })
    }
}
