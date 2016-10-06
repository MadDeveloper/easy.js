import Container from './Container'

/**
 * @class Kernel
 */
export default class Kernel {
    /**
     * @constructor
     */
    constructor() {
        this._appName   = ''
        this._container = null
        this._path      = {}
    }

    /**
     * init - init kernel and components
     *
     * @param  {string} root
     * @param  {object} config
     * @returns {Kernel}
     */
    init( root, config ) {
        /*
         * paths
         */
        this.path.root          = root
        this.path.bin           = `${this.path.root}/bin`
        this.path.bundles       = `${this.path.root}/bundles`
        this.path.config        = `${this.path.root}/config`
        this.path.lib           = `${this.path.root}/lib`
        this.path.services      = `${this.path.root}/services`
        this.path.test          = { root: `${this.path.root}/test` }
        this.path.test.bundles  = `${this.path.test.root}/bundles`
        this.path.test.lib      = `${this.path.test.root}/lib`
        this.path.test.services = `${this.path.test.root}/services`
        this.path.vendor        = { root: `${this.path.root}/vendor` }
        this.path.vendor.easy   = `${this.path.vendor.root}/easy`

        /*
         * Usefull to store app data with namespace into the request
         */
        this._appName = config.app.name

        /*
         * Starting and initializing container
         */
        this.initContainer()

        return this
    }

    /**
     * initContainer - init container component
     */
    initContainer() {
        this._container = new Container( this )
        this.container.loadComponents()
    }

    /**
     * getEnv - get node environment
     *
     * @returns {string}
     */
    getEnv() {
        return process.env.NODE_ENV
    }

    /**
     * isDevEnv - check if we are in dev environment
     *
     * @returns {boolean}
     */
    isDevEnv() {
        return "development" === this.getEnv().toLowerCase()
    }

    /**
     * isDevEnv - check if we are in dev environment
     *
     * @returns {boolean}
     */
    isProdEnv() {
        return !this.isDevEnv()
    }

    /**
     * get - app name
     *
     * @returns {string}
     */
    get appName() {
        return this._appName
    }

    /**
     * get - container instance
     *
     * @returns {Container}
     */
    get container() {
        return this._container
    }

    /**
     * get - all paths
     *
     * @returns {object}
     */
    get path() {
        return this._path
    }
}
