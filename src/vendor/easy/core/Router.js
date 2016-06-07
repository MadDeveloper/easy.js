/**
 * @class Router
 */
export default class Router {
    /**
     * @constructor
     */
    constructor() {
        this._scope = null
    }

    /**
     * get - express router
     *
     * @returns {express.Router}
     */
    get scope() {
        return this._scope
    }

    /**
     * set - express router
     *
     * @param  {express.Router} scope
     * @returns {Router}
     */
    set scope( scope ) {
        this._scope = scope
        return this
    }
}
