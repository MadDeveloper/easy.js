export default class SecurityController {
    constructor( roleFactory ) {
        this._roleFactory   = roleFactory
        this._bundleManager = this._roleFactory.bundleManager
        this._container     = this._bundleManager.container
        this._http          = this._container.getComponent( 'Http' )
        this._controller    = this._container.getComponent( 'Controller' )
        this._request       = this._container.getComponent( 'Request' )
        this._access        = new ( this._container.getService( 'security/access' ) )()
    }

    authorize() {
        return new Promise( ( resolve, reject ) => {
            if ( this.controller.isProdEnv() ) {
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
                    this.http.forbidden()
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
    get roleFactory() {
        return this._roleFactory
    }

    get bundleManager() {
        return this._bundleManager
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

    get access() {
        return this._access
    }
}
