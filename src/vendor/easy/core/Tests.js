/**
 * @class Tests
 */
export default class Tests {
    /**
     * @constructor
     * @param  {Container} container
     */
    constructor( container ) {
        this._container     = container
        this._factory       = container.getComponent( 'Factory' )
        this._entityManager = container.getComponent( 'EntityManager' )
        this._request       = container.getComponent( 'Request' )
        this._response      = container.getComponent( 'Response' )
        this._database      = container.getComponent( 'Database' ).connection

        this.run()
    }

    /**
     * run - automatically called
     */
    run() {}

    /**
     * get - factory instance
     *
     * @returns {Factory}
     */
    get factory() {
        return this._factory
    }

    /**
     * get - entity manager instance
     *
     * @returns {EntityManager}
     */
    get entityManager() {
        return this._entityManager
    }

    /**
     * get Container
     *
     * @returns {Container}
     */
    get container() {
        return this._container
    }

    /**
     * get Request
     *
     * @returns {Request}
     */
    get request() {
        return this._request
    }

    /**
     * get Response
     *
     * @returns {Response}
     */
    get response() {
        return this._response
    }

    /**
     * get Database
     *
     * @returns {Database}
     */
    get database() {
        return this._database
    }
}
