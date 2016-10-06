import fs           from 'fs'
import Component    from './Component'

/**
 * @class BundleManager
 * @extends Component
 */
export default class BundleManager extends Component {
    /**
     * @constructor
     * @param  {Container} container
     */
    constructor( container ) {
        super()

        this._container         = container
        this._bundlesPath       = container.kernel.path.bundles
        this._bundlesDefinition = []
    }

    /**
     * loadBundlesEnabledConfiguration - load all bundles enabled into ~/config/bundles/enabled.js
     *
     * @param {Array} bundlesEnabled
     */
    loadBundlesEnabledConfiguration( bundlesEnabled ) {
        bundlesEnabled.forEach( element => {
            this.enable( element )
        })
    }

    /**
     * enable - enable bundle (routing)
     *
     * @param {string} bundle
     */
    enable( bundle ) {
        const bundleDirPath = `${this.bundlesPath}/${bundle}`

        if ( fs.statSync( bundleDirPath ).isDirectory() ) {
            this.bundlesDefinition.push( bundle )
        }
    }

    /**
     * getRouting - retrieve defined bundle routing
     *
     * @param  {string} bundle
     */
    getRouting( bundle ) {
        const routingPath = `${this.bundlesPath}/${bundle}/config/routing.js`

        if ( fs.statSync( routingPath ).isFile() ) {
            const routingBundle = require( routingPath ).default /* .default is needed to patch babel exports.default build, require doesn't work, import does */
            routingBundle( this.router, this.factory )
        }
    }

    /**
     * getBundlesDefinitionRouting - will register bundles routing into express router stack
     *
     */
    getBundlesDefinitionRouting() {
        let bundle

        for ( var i in this.bundlesDefinition ) {
            bundle = this.bundlesDefinition[ i ]
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

    /**
     * get - all bundles defined
     *
     * @returns {Array}
     */
    get bundlesDefinition() {
        return this._bundlesDefinition
    }

    /**
     * get - express router
     *
     * @returns {express.Router}
     */
    get router() {
        return this._container.getComponent( 'Router' ).scope
    }

    /**
     * get - factory instance
     *
     * @returns {Factory}
     */
    get factory() {
        return this._container.getComponent( 'Factory' )
    }
}
