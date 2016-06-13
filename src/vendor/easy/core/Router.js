import Component from './Component'

/**
 * @class Router
 * @extends Component
 */
export default class Router extends Component {
    /**
     * @constructor
     */
    constructor() {
        super()

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
