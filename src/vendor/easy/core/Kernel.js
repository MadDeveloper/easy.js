/**
 * @class Kernel
 */
export default class Kernel {
    /**
     * @constructor
     */
    constructor() {
        this._path = {}
    }

    /**
     * init - init kernel and components
     *
     * @param  {string} root
     * @returns {Kernel}
     */
    init( root ) {
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

        return this
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
