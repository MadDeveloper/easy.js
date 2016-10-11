import fs           from 'fs'
import Injectable   from './Injectable'
import ConfigLoader from './ConfigLoader'

/**
 * @class BundleManager
 * @extends Injectable
 */
export default class BundleManager extends Injectable {
    /**
     * @constructor
     * @param  {Container} container
     */
    constructor( container ) {
        super()

        this._container     = container
        this._bundlesPath   = container.kernel.path.bundles
        this._bundles       = []
    }

    /**
     * loadBundlesEnabled - load all bundles enabled into ~/config/bundles.js
     */
    loadBundlesEnabled() {
        ConfigLoader.loadFromGlobal( 'bundles' ).forEach( element => this.enable( element ) )
    }

    /**
     * enable - enable bundle (routing)
     *
     * @param {string} bundle
     */
    enable( bundle ) {
        const bundleDirPath = `${this.bundlesPath}/${bundle}`

        if ( fs.statSync( bundleDirPath ).isDirectory() ) {
            this.bundles.push( bundle )
        }
    }

    /**
     * getBundleRoutes - retrieve defined bundle routes
     *
     * @param  {string} bundle
     * @param  {express.Router} router
     */
    getBundleRoutes( bundle, router ) {
        const routesPath = `${this.bundlesPath}/${bundle}/index.js`

        if ( fs.statSync( routesPath ).isFile() ) {
            const bundleRoutes = require( routesPath ).default /* .default is needed to patch babel exports.default build, require doesn't work, import does */
            bundleRoutes( router )
        }
    }


    /**
     * getBundlesRoutes - will register bundles routes into express router stack
     *
     * @param  {express.Router} router
     */
    getBundlesRoutes( router ) {
        let bundle

        for ( var i in this.bundles ) {
            bundle = this.bundles[ i ]
            this.getBundleRoutes( bundle, router )
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

    /**
     * get - all bundles defined
     *
     * @returns {Array}
     */
    get bundles() {
        return this._bundles
    }
}
