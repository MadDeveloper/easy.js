export default class Router {
    constructor() {
        this._scope = null
    }

    /*
     * Getters and setters
     */
    get scope() {
        return this._scope
    }

    set scope( scope ) {
        this._scope = scope
        return this
    }
}
