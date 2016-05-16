export default class MiddlewaresController {
    constructor( userFactory ) {
        this._userFactory   = userFactory
        this._bundleManager     = this._userFactory.bundleManager
        this._container         = this._bundleManager.container
        this._http              = this._container.getComponent( 'Http' )
        this._controller        = this._container.getComponent( 'Controller' )
        this._request           = this._container.getComponent( 'Request' )
    }

    userExists() {
        return new Promise( ( resolve, reject ) => {
            const requireOptions = {
                requireBy: this.request.getRouteParameter( 'idUser' ),
                options: {}
            }

            this.controller.doesRequiredElementExists( 'User', requireOptions, this.bundleManager, user => {
                this.request.define( 'user', user )
                resolve()
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
