import fs from 'fs'

export default class BundleManager {
    constructor( container ) {
        this._container         = container
        this._kernel            = this._container.kernel
        this._database          = null
        this._router            = null
        this._bundlesDefinition = []
    }

    define( bundle ) {
        const bundleDirPath = this.getBundlesDirectory() + '/' + bundle

        if ( fs.statSync( bundleDirPath ).isDirectory() ) {
            this.bundlesDefinition.push( bundle )
        }

        return this
    }

    getFactory( bundle, params ) {
        const factoryPath = this.getBundlesDirectory() + '/' + bundle + '/' + bundle.capitalizeFirstLetter() + 'Factory.js'

        if ( fs.statSync( factoryPath ).isFile() ) {
            return new ( require( factoryPath ) )( this, params )
        }
    }

    getRouting( bundle, params ) {
        const routingPath = this.getBundlesDirectory() + '/' + bundle + '/config/routing.js'

        if ( fs.statSync( routingPath ).isFile() ) {
            return require( routingPath )( this.getFactory( bundle ), params )
        }
    }

    getBundlesDefinitionRouting( params ) {
        let routingPath = ''

        for ( var i in this.bundlesDefinition ) {
            routingPath = this.getBundlesDirectory() + '/' + bundles[ i ] + '/config/routing.js'

            if ( fs.statSync( routingPath ).isFile() ) {
                require( routingPath )( this.getFactory( bundle ), params )
            }
        }
    }

    getContainer() {
        if ( null === this.container ) {
            this.container = new ( this.kernel.getContainer() )( this.kernel )
        }

        return this.container
    }

    getDatabase() {
        return this.database.connection
    }

    getBundlesDirectory() {
        return this.kernel.path.bundles
    }

    /*
     * Getters and setter
     */
    get appName() {
        return this.kernel.appName
    }

    get kernel() {
        return this._kernel
    }

    get router() {
        return this._router
    }

    set router( router ) {
        this._router = router
    }

    get database() {
        return this._database
    }

    set database( database ) {
        this._database = database
    }

    get bundlesDefinition() {
        return this._bundlesDefinition
    }

    get container() {
        return this._container
    }
}
