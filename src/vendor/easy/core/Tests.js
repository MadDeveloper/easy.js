export default class Tests {
    constructor( container ) {
        this._request       = container.getComponent( 'Request' )
        this._response      = container.getComponent( 'Response' )
        this._bundleManager = container.getComponent( 'BundleManager' )
        this._database      = container.getComponent( 'Database' ).connection

        this.run()
    }

    run() {}

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

    get database() {
        return this._database
    }
}
