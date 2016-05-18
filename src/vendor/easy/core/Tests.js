export default class Tests {
    constructor( container ) {
        this._container     = container
        this._bundleManager = this._container.getComponent( 'BundleManager' )
        this._database      = this._bundleManager.database
        this._controller    = this._container.getComponent( 'Controller' )
        this._request       = this._container.getComponent( 'Request' )
        this._response      = this._container.getComponent( 'Response' )

        this.run()
    }

    run() {}

    /*
     * Getters and setters
     */
    get container() {
        return this._container
    }

    get bundleManager() {
        return this._bundleManager
    }

    get database() {
        return this._database
    }

    get controller() {
        return this._controller
    }

    get request() {
        return this._request
    }

    get response() {
        return this._response
    }
}
