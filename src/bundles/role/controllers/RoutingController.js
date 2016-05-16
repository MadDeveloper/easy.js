export default class RoutingController {
    constructor( roleFactory ) {
        this._roleFactory       = roleFactory
        this._bundleManager     = this._roleFactory.bundleManager
        this._router            = this._bundleManager.router
        this._database          = this._bundleManager.database
        this._container         = this._bundleManager.container
        this._http              = this._container.getComponent( 'Http' )
        this._controller        = this._container.getComponent( 'Controller' )
        this._request           = this._container.getComponent( 'Request' )
        this._roleRepository    = this._roleFactory.getRepository()
    }

    isRequestWellParameterized() {
        return this.controller.verifyParams([
            { property: 'name', typeExpected: 'string' },
            { property: 'slug', typeExpected: 'string' }
        ], this.request.getBody() )
    }

    getRoles() {
        this.roleRepository.readAll()
        .then( roles => {

            this.http.ok( roles.toJSON() )

        })
        .catch( error => {
            this.http.internalServerError( error )
        })
    }

    createRole() {
        if ( this.isRequestWellParameterized() ) {

            this.database.transaction( t => {

                this.roleRepository.save( this.roleFactory.getNewModel(), this.request.getBody(), { transacting: t } )
                .then( role => {

                    t.commit()
                    this.http.created( role.toJSON() )

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

    getRole() {
        this.http.ok( this.request.find( 'role' ).toJSON() )
    }

    updateRole() {
        if ( this.isRequestWellParameterized() ) {

            this.database.transaction( function( t ) {

                this.roleRepository.save( this.request.find( 'role' ), this.request.getBody(), { transacting: t } )
                .then( role => {

                    t.commit()
                    this.http.ok( role.toJSON() )

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

    deleteRole() {
        this.database.transaction( t => {

            this.roleRepository.delete( this.request.find( 'role' ), { transacting: t } )
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
}
