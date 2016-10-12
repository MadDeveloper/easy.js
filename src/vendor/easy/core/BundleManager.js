import fs           from 'fs'
import Configurable from './../interfaces/Configurable'
import ConfigLoader from './ConfigLoader'

/**
 * @class BundleManager
 * @extends Configurable
 */
export default class BundleManager extends Configurable {
    /**
     * @constructor
     */
    constructor() {
        super()

        this._bundlesPath   = ''
        this._bundles       = {}
    }

    /**
     * configure - description
     *
     * @param  {type} bundlesPath description
     * @returns {type}             description
     */
    configure( bundlesPath ) {
        this._bundlesPath = bundlesPath
    }

    /**
     * loadBundles - load all bundles defined into ~/config/bundles.js
     */
    loadBundles() {
        ConfigLoader.loadFromGlobal( 'bundles' ).forEach( element => this.loadBundle( element ) )
    }

    /**
     * loadBundle - load bundle index file
     *
     * @param {string} bundle
     */
    loadBundle( bundle ) {
        const bundlePath = `${this.bundlesPath}/${bundle}`

        if ( fs.statSync( bundlePath ).isDirectory() ) {
            this.bundles[ bundle ] = require( bundlePath )
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
     * @returns {Object}
     */
    get bundles() {
        return this._bundles
    }
}
