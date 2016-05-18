export default class Service {
    constructor( container ) {
        this._container     = container
        this._request       = this._container.getComponent( 'Request' )
        this._response      = this._container.getComponent( 'Response' )
        this._bundleManager = this._container.getComponent( 'BundleManager' )
        this._router        = this._bundleManager.router
        this._database      = this._bundleManager.database

        this.load()
    }

    load() {}

    /*
     * Getters and setters
     */
    get container() {
        return this._container
    }

    get request() {
        return this._request
    }

    get response() {
        return this._response
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
}
