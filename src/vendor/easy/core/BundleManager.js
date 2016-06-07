import fs from 'fs'

/**
 * @class BundleManager
 */
export default class BundleManager {
    /**
     * @constructor
     * @param  {Container} container
     */
    constructor( container ) {
        this._container         = container
        this._kernel            = container.kernel
        this._factory           = container.getComponent( 'Factory' )
        this._router            = container.getComponent( 'Router' ).scope
        this._bundlesPath       = container.kernel.path.bundles
        this._bundlesDefinition = []
    }

    /**
     * define - register bundle
     *
     * @param  {string} bundle
     * @returns {BundleManager}
     */
    define( bundle ) {
        const bundleDirPath = `${this.getBundlesDirectory()}/${bundle}`

        if ( fs.statSync( bundleDirPath ).isDirectory() ) {
            this.bundlesDefinition.push( bundle )
        }

        return this
    }

    /**
     * getRouting - retrieve defined bundle routing
     *
     * @param  {string} bundle
     * @returns {type}
     */
    getRouting( bundle ) {
        const routingPath = `${this.getBundlesDirectory()}/${bundle}/config/routing.js`

        if ( fs.statSync( routingPath ).isFile() ) {
            const routingBundle = require( routingPath ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

            return routingBundle( this.router, this.factory )
        }
    }

    getBundlesDefinitionRouting() {
        for ( var i in this.bundlesDefinition ) {
            const bundle = this.bundlesDefinition[ i ]
            this.getRouting( bundle )
        }
    }

    /**
     * get - absolute bundle path
     *
     * @returns {string}
     */
    get bundlesPath() {
        return this._bundlesPath
    }

    get bundlesDefinition() {
        return this._bundlesDefinition
    }

    get container() {
        return this._container
    }

    get router() {
        return this._router
    }

    get factory() {
        return this._factory
    }
}
