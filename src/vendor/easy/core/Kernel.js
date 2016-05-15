import fs from 'fs'

export default class Kernel {
    constructor() {
        this._appName = ''
        this._componentsLoaded = {}
        this.path = {
            root: '',
            bundles: '',
            services: '',
            config: '',
            vendor: ''
        }
    }

    init( root, config ) {
        this.path.root      = root
        this.path.bundles   = this.path.root + '/bundles'
        this.path.services  = this.path.root + '/services'
        this.path.config    = this.path.root + '/config'
        this.path.vendor    = this.path.root + '/vendor'

        this.appName = config.app.name

        return this
    }

    load( component ) {
        if ( "undefined" === typeof this.componentsLoaded[ component ] ) {
            const componentPath = __dirname + '/' + component + '.js'

            if ( fs.statSync( componentPath ).isFile() ) {
                this.storeComponent( component, componentPath )
            }
        }

        return this.componentsLoaded[ component ]
    }

    storeComponent( component, path ) {
        this.componentsLoaded[ component ] = require( path )
        return this
    }

    getContainer() {
        return this.load( 'Container' )
    }

    getEnv() {
        return process.env.NODE_ENV
    }

    isDevEnv() {
        return "development" === this.getEnv().toLowerCase()
    }

    isProdEnv() {
        return !this.isDevEnv()
    }

    /*
     * Getters and setters
     */
    get appName() {
        return this._appName
    }

    set appName( appName ) {
        this._appName = appName
        return this
    }

    get componentsLoaded() {
        return this._componentsLoaded
    }

    get path() {
        return this._path
    }

    set path( path ) {
        this._path = path
        return this
    }
}
