import _            from 'lodash'
import Controller   from './../../../vendor/easy/core/Controller'

export default class RoutingController extends Controller {
    constructor( userFactory ) {
        super( userFactory.container )

        this._userFactory       = userFactory
        this._userRepository    = this._userFactory.getRepository()
        this._roleFactory       = this._bundleManager.getFactory( 'role' )
        this._roleRepository    = this._roleFactory.getRepository()
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
        this.userRepository.readAll( this.request.find( 'role' ) )
        .then( users => {

            this.response.ok( users.toJSON() )

        })
        .catch( error => {
            this.response.internalServerError( error )
        })
    }

    createUser() {
        if ( this.isRequestWellParameterized() ) {

            this.database.transaction( t => {

                this.request.setBodyParameter( 'role_id', this.request.getRouteParameter( 'idRole' ) )

                this.userRepository.save( UserFactory.getNewModel(), this.request.getBody(), { transacting: t } )
                .then( user => {
                    t.commit()
                    this.response.created( user.toJSON() )
                })
                .catch( error => {
                    t.rollback()
                    this.response.internalServerError( error )
                })

            })

        } else {
            this.response.badRequest()
        }
    }

    getUser() {
        this.response.ok( this.request.find( 'user' ).toJSON() )
    }

    updateUser() {
        if ( this.isRequestWellParameterized() ) {

            this.database.transaction( t => {

                if ( typeof this.request.getBodyParameter( 'role_id' ) === "undefined" ) {
                    this.request.setBodyParameter( 'role_id', this.request.getRouteParameter( 'idRole' ) )
                }

                this.userRepository.save( this.request.find( 'user' ), this.request.getBody(), { transacting: t } )
                .then( user => {

                    t.commit()
                    this.response.ok( user.toJSON() )

                })
                .catch( error => {
                    t.rollback()
                    this.response.internalServerError( error )
                })

            })

        } else {
            this.response.badRequest()
        }
    }

    patchUser() {

    }

    deleteUser() {
        this.database.transaction( t => {

            this.userRepository.delete( this.request.find( 'user' ), { transacting: t } )
            .then( () => {

                t.commit()
                this.response.noContent()

            })
            .catch( error => {
                t.rollback()
                this.response.internalServerError( error )
            })

        })
    }

    /*
     * Getters and setters
     */
    get userFactory() {
        return this._userFactory
    }

    get userRepository() {
        return this._userRepository
    }

    get roleFactory() {
        return this._roleFactory
    }

    get roleRepository() {
        return this._roleRepository
    }
}
