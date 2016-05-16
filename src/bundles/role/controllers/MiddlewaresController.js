export default class MiddlewaresController {
    constructor( roleFactory ) {
        this._roleFactory       = roleFactory
        this._bundleManager     = this._roleFactory.bundleManager
        this._container         = this._bundleManager.container
        this._http              = this._container.getComponent( 'Http' )
        this._controller        = this._container.getComponent( 'Controller' )
        this._request           = this._container.getComponent( 'Request' )
    }

    roleExists() {
        return new Promise( ( resolve, reject ) => {
            const requireOptions = {
                requireBy: this.request.getRouteParameter( 'id' ),
                options: {}
            }

            this.controller.doesRequiredElementExists( 'Role', requireOptions, this.bundleManager, role => {
                this.request.define( 'role', role )
                resolve()
            })
        })
    }

    /*
     * Getters and setters
     */
    get rolesFactory() {
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
}
