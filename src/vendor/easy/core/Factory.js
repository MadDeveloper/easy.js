/**
 * @class Factory
 */
export default class Factory {
    /**
     * @constructor
     * @param  {Container} container
     */
    constructor( container ) {
        this._container = container
    }

    /**
     * getController - get specific bundle controller (e.g. skeleton.routing -> SkeletonRoutingController )
     *
     * @param  {string} controller description
     * @returns {Controller}
     */
    getController( controller ) {
        if ( controller.length > 0 ) {
            let bundle      = ''
            let controller  = ''

            if ( -1 === controller.indexOf( '.' ) ) {
                bundle = controller
                controller = 'Routing'
            } else {
                const info  = controller.split( '.' )
                bundle      = info[ 0 ]
                controller  = info[ 1 ]
            }

            const controllerClass = require( `${this.bundlePath}/${bundle}/controllers/${bundle.capitalizeFirstLetter()}${controller.capitalizeFirstLetter()}Controller` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

            return new controllerClass( this )
        }
    }

    /**
     * getConfig - get specific bundle configuration (e.g. skeleton.middlewares -> skeleton/config/middlewares.js )
     *
     * @param  {string} config
     * @returns {function}
     */
    getConfig( config ) {
        if ( config.length > 0 ) {
            const info          = config.split( '.' )
            const bundle        = info[ 0 ]
            const config        = info[ 1 ]
            const configClass   = require( `${this.bundlePath}/${bundle}/config/${config}` ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

            return configClass( this.router, this )
        }
    }

    /**
     * get - vendor container
     *
     * @returns {Container}
     */
    get container() {
        return this.bundleManager.container
    }

    /**
     * get - absolute bundle path
     *
     * @returns {string}
     */
    get bundlePath() {
        return this.container.kernel.path.bundles
    }

    /**
     * get - database instance
     *
     * @returns {object}
     */
    get database() {
        return this.container.getComponent( 'Database' ).connection
    }

    /**
     * get - express router
     *
     * @returns {express.Router}
     */
    get router() {
        return this.container.getComponent( 'Router' ).scope
    }

    /**
     * get - entity manager instance
     *
     * @returns {EntityManager}
     */
    get entityManager() {
        return this.container.getComponent( 'EntityManager' )
    }
}
