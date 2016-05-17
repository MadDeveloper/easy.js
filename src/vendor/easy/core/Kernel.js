import fs           from 'fs'
import Container    from './Container'

export default class Kernel {
    constructor() {
        this._appName   = ''
        this._container = null
        this._path      = {
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
        this.path.easy      = this.path.vendor + '/easy'

        this.appName = config.app.name

        this.loadContainer()

        return this
    }

    loadContainer() {
        this.container = new Container( this )
        this.initContainer()
    }

    initContainer() {
        this.container.loadComponents()
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

    get container() {
        return this._container
    }

    set container( container ) {
        this._container = container
        return this
    }

    get path() {
        return this._path
    }

    set path( path ) {
        this._path = path
        return this
    }
}
