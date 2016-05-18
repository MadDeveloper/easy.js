import Controller from './../../../vendor/easy/core/Controller'

export default class SecurityController extends Controller {
    constructor( skeletonFactory ) {
        super( skeletonFactory.container )

        this._access = this.container.getService( 'security.access' )
    }

    authorize() {
        return new Promise( ( resolve, reject ) => {
            if ( this.isProdEnv() ) {
                const token = this.request.getBodyParameter( 'token' )

                this.access.restrict({
                    mustBe: [ this.access.any ],
                    canCreate: [],
                    canRead: [],
                    canUpdate: [],
                    canDelete: []
                })

                if ( this.access.focusOn( token.role_id ).canReach( this.request.getMethod() ) ) {
                    resolve()
                } else {
                    this.response.forbidden()
                    reject()
                }
            } else {
                resolve()
            }
        })
    }

    /*
     * Getters and setters
     */
    get access() {
        return this._access
    }
}
