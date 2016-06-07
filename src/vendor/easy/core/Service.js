/**
 * @class Service
 */
export default class Service {
    /**
     * @constructor
     * @param  {Container} container
     */
    constructor( container ) {
        this._container     = container
        this._request       = container.getComponent( 'Request' )
        this._response      = container.getComponent( 'Response' )
        this._database      = container.getComponent( 'Database' ).connection
        this._router        = container.getComponent( 'Router' ).scope
        this._entityManager = container.getComponent( 'EntityManager' )

        this.load()
    }

    /**
     * load service, called automatically
     */
    load() {}

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
     * get Router
     *
     * @returns {Router}
     */
    get router() {
        return this._router
    }

    /**
     * get Database
     *
     * @returns {Database}
     */
    get database() {
        return this._database
    }

    /**
     * get - entity manager instance
     *
     * @returns {EntityManager}
     */
    get entityManager() {
        return this._entityManager
    }
}
