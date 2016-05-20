export default class Entity {
    constructor( bundleFactory ) {
        this._bundleManager = bundleFactory.bundleManager
        this._database      = this._bundleManager.database
    }

    /*
     * Getters and setters
     */
    get bundleManager() {
        return this._bundleManager
    }

    get database() {
        return this._database
    }
}
