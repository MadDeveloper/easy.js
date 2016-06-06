import Controller   from './../../../vendor/easy/core/Controller'

/**
 * @class UserRoutingController
 */
export default class UserRoutingController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( factory ) {
        super( 'user', factory )

        this._roleRepository = this._factory.getController( 'role' ).getRepository()
    }

    isRequestWellParameterized() {
        return this.verifyParams([
            { property: 'username', typeExpected: 'string' },
            { property: 'email', typeExpected: 'string' },
            { property: 'password', typeExpected: 'string' },
            { property: 'role_id', typeExpected: 'number', optional: true }
        ], this.request.getBody() )
    }

    getUsers() {
        this.getRepository().readAll( this.request.find( 'role' ) )
        .then( users => {
            this.response.ok( users )
        })
        .catch( error => {
            this.response.internalServerError( error )
        })
    }

    createUser() {
        if ( this.isRequestWellParameterized() ) {
            this.request.setBodyParameter( 'role_id', this.request.getRouteParameter( 'idRole' ) )

            this.getRepository().save( new this.getRepository().getModel(), this.request.getBody() )
            .then( user => {
                this.response.created( user )
            })
            .catch( error => {
                this.response.internalServerError( error )
            })
        } else {
            this.response.badRequest()
        }
    }

    getUser() {
        this.response.ok( this.request.find( 'user' ) )
    }

    updateUser() {
        if ( this.isRequestWellParameterized() ) {
            if ( typeof this.request.getBodyParameter( 'role_id' ) === "undefined" ) {
                this.request.setBodyParameter( 'role_id', this.request.getRouteParameter( 'idRole' ) )
            }

            this.getRepository().save( this.request.find( 'user' ), this.request.getBody() )
            .then( user => {
                this.response.ok( user )
            })
            .catch( error => {
                this.response.internalServerError( error )
            })
        } else {
            this.response.badRequest()
        }
    }

    patchUser() {

    }

    deleteUser() {
        this.getRepository().delete( this.request.find( 'user' ) )
        .then( () => {
            this.response.noContent()
        })
        .catch( error => {
            this.response.internalServerError( error )
        })
    }

    get roleRepository() {
        return this._roleRepository
    }
}
