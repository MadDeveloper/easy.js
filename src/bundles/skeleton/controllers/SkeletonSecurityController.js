import Controller from './../../../vendor/easy/core/Controller'

/**
 * @class SkeletonSecurityController
 */
export default class SkeletonSecurityController extends Controller {
    /**
     * @constructor
     * @param  {Factory} factory
     */
    constructor( req, res, factory ) {
        super( req, res, factory )

        this._access = this.getService( 'security.access' )
    }

    /**
     * authorize - determine is current user can access to bundle routes
     *
     * @param {function} next
     */
    authorize( next ) {
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
                next()
            } else {
                this.response.forbidden()
            }
        } else {
            next()
        }
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
