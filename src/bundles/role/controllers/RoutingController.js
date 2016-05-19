import Controller from './../../../vendor/easy/core/Controller'

export default class RoutingController extends Controller {
    constructor( roleFactory ) {
        super( roleFactory.container )

        this._roleFactory       = roleFactory
        this._roleRepository    = this._roleFactory.getRepository()
    }

    isRequestWellParameterized() {
        return this.verifyParams([
            { property: 'name', typeExpected: 'string' },
            { property: 'slug', typeExpected: 'string' }
        ], this.request.getBody() )
    }

    getRoles() {
        this.roleRepository.readAll()
        .then( roles => {

            this.response.ok( roles.toJSON() )

        })
        .catch( error => {
            this.response.internalServerError( error )
        })
    }

    createRole() {
        if ( this.isRequestWellParameterized() ) {

            this.database.transaction( t => {

                this.roleRepository.save( this.roleFactory.getNewModel(), this.request.getBody(), { transacting: t } )
                .then( role => {

                    t.commit()
                    this.response.created( role.toJSON() )

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

    getRole() {
        this.response.ok( this.request.find( 'role' ).toJSON() )
    }

    updateRole() {
        if ( this.isRequestWellParameterized() ) {

            this.database.transaction( t => {

                this.roleRepository.save( this.request.find( 'role' ), this.request.getBody(), { transacting: t } )
                .then( role => {

                    t.commit()
                    this.response.ok( role.toJSON() )

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

    deleteRole() {
        this.database.transaction( t => {

            this.roleRepository.delete( this.request.find( 'role' ), { transacting: t } )
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
    get roleFactory() {
        return this._roleFactory
    }

    get roleRepository() {
        return this._roleRepository
    }
}
