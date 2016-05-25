export default class Service {
    constructor( container ) {
        this._request       = container.getComponent( 'Request' )
        this._response      = container.getComponent( 'Response' )
        this._bundleManager = container.getComponent( 'BundleManager' )
        this._database      = container.getComponent( 'Database' )
        this._router        = this._bundleManager.router

        this.load()
    }

    load() {}

    /*
     * Getters and setters
     */
    get container() {
        return this._bundleManager.container
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
