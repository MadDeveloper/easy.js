import Controller from './../../../vendor/easy/core/Controller'

/**
 * @class UserSecurityController
 */
export default class UserSecurityController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( factory ) {
        super( factory )

        this._access = this.getService( 'security.access' )
    }

    authorize() {
        return new Promise( ( resolve, reject ) => {
            if ( this.isProdEnv() ) {
                const token = this.request.getBodyParameter( 'token' )

                this.access.restrict({
                    mustBe: [ this.access.any ],
                    canCreate: [ this.access.admin ],
                    canRead: [],
                    canUpdate: [ this.access.admin ],
                    canDelete: [ this.access.admin ]
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
