import Controller from './../../../vendor/easy/core/Controller'

/**
 * @class SkeletonSecurityController
 */
export default class SkeletonSecurityController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( factory ) {
        super( factory )

        this._access = this.getService( 'security.access' )
    }

    /**
     * authorize - determine is current user can access to bundle routes
     *
     * @returns {Promise}
     */
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

    /**
     * get - access service
     *
     * @returns {AccessSecurityService}
     */
    get access() {
        return this._access
    }
}
