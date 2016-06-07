export default class Tests {
    constructor( container ) {
        this._container     = container
        this._factory       = container.getComponent( 'Factory' )
        this._entityManager = container.getComponent( 'EntityManager' )
        this._request       = container.getComponent( 'Request' )
        this._response      = container.getComponent( 'Response' )
        this._database      = container.getComponent( 'Database' ).connection

        this.run()
    }

    run() {}

    /*
     * Getters and setters
     */
    get factory() {
        return this._factory
    }

    get entityManager() {
        return this._entityManager
    }

    get container() {
        return this._container
    }

    get request() {
        return this._request
    }

    get response() {
        return this._response
    }

    get database() {
        return this._database
    }
}
