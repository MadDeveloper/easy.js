import _ from 'lodash'

export default class RoutingController {
    constructor( userFactory ) {
        this._userFactory       = userFactory
        this._bundleManager     = this._userFactory.bundleManager
        this._router            = this._bundleManager.router
        this._database          = this._bundleManager.database
        this._container         = this._bundleManager.container
        this._http              = this._container.getComponent( 'Http' )
        this._controller        = this._container.getComponent( 'Controller' )
        this._request           = this._container.getComponent( 'Request' )
        this._userRepository    = this._userFactory.getRepository()
        this._roleFactory       = this._bundleManager.getFactory( 'Role' )
        this._roleRepository    = this._roleFactory.getRepository()
    }

    isRequestWellParameterized() {
        return this.controller.verifyParams([
            { property: 'username', typeExpected: 'string' },
            { property: 'email', typeExpected: 'string' },
            { property: 'password', typeExpected: 'string' },
            { property: 'role_id', typeExpected: 'number', optional: true }
        ], this.request.getBody() )
    }

    getUsers() {
        this.userRepository.readAll( this.request.find( 'role' ) )
        .then( users => {

            this.http.ok( users.toJSON() )

        })
        .catch( error => {
            this.http.internalServerError( error )
        })
    }

    createUser() {
        if ( this.isRequestWellParameterized() ) {

            this.database.transaction( t => {

                this.request.setBodyParameter( 'role_id', this.request.getRouteParameter( 'idRole' ) )

                this.userRepository.save( UserFactory.getNewModel(), this.request.getBody(), { transacting: t } )
                .then( user => {
                    t.commit()
                    this.http.created( user.toJSON() )
                })
                .catch( error => {
                    t.rollback()
                    this.http.internalServerError( error )
                })

            })

        } else {
            this.http.badRequest()
        }
    }

    getUser() {
        this.http.ok( this.request.find( 'user' ).toJSON() )
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
                    this.http.ok( user.toJSON() )

                })
                .catch( error => {
                    t.rollback()
                    this.http.internalServerError( error )
                })

            })

        } else {
            this.http.badRequest()
        }
    }

    patchUser() {

    }

    deleteUser() {
        this.database.transaction( t => {

            this.userRepository.delete( this.request.find( 'user' ), { transacting: t } )
            .then( () => {

                t.commit()
                this.http.noContent()

            })
            .catch( error => {
                t.rollback()
                this.http.internalServerError( error )
            })

        })
    }

    /*
     * Getters and setters
     */
    get userFactory() {
        return this._userFactory
    }

    get bundleManager() {
        return this._bundleManager
    }

    get router() {
        return this._router
    }

    get database() {
        return this._database
    }

    get container() {
        return this._container
    }

    get http() {
        return this._http
    }

    get controller() {
        return this._controller
    }

    get request() {
        return this._request
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
