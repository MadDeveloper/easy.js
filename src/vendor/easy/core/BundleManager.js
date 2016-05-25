import fs from 'fs'

export default class BundleManager {
    constructor( container ) {
        this._container         = container
        this._kernel            = this._container.kernel
        this._bundlesDefinition = []
    }

    define( bundle ) {
        const bundleDirPath = `${this.getBundlesDirectory()}/${bundle}`

        if ( fs.statSync( bundleDirPath ).isDirectory() ) {
            this.bundlesDefinition.push( bundle )
        }

        return this
    }

    getFactory( bundle ) {
        const factoryPath = `${this.getBundlesDirectory()}/${bundle}/${bundle.capitalizeFirstLetter()}Factory.js`

        if ( fs.statSync( factoryPath ).isFile() ) {
            const factoryBundle = require( factoryPath ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

            return new factoryBundle( this )
        }
    }

    getRouting( bundle ) {
        const routingPath = `${this.getBundlesDirectory()}/${bundle}/config/routing.js`

        if ( fs.statSync( routingPath ).isFile() ) {
            const routingBundle = require( routingPath ).default /* .default is needed to patch babel exports.default build, require doesn't work, import do */

            return routingBundle( this.getFactory( bundle ) )
        }
    }

    getBundlesDefinitionRouting() {
        for ( var i in this.bundlesDefinition ) {
            const bundle = this.bundlesDefinition[ i ]
            this.getRouting( bundle )
        }
    }

    getBundlesDirectory() {
        return this._kernel.path.bundles
    }

    /*
     * Getters and setter
     */
    get appName() {
        return this.kernel.appName
    }

    get routerComponent() {
        return this.container.getComponent( 'Router' )
    }

    get router() {
        return this.routerComponent.scope
    }

    get database() {
        return this.container.getComponent( 'Database' ).connection
    }

    get bundlesDefinition() {
        return this._bundlesDefinition
    }

    get container() {
        return this._container
    }
}
