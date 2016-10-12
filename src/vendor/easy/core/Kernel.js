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
        this.path.services      = `${this.path.root}/services`
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
