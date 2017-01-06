const fs = require( 'fs' )
const Console = require( '../core/Console' )

/**
 * @class Container
 */
class Container {
    /**
     * @constructor
     */
    constructor() {
        /*
         * Dependencies
         */
        this._shared = {}
    }

    /**
     * register - register dependency
     *
     * @param  {string} name
     * @param  {any} dependency
     * @returns {Cotnainer}
     */
    register( name, dependency ) {
        this.shared[ name ] = dependency

        return this
    }

    /**
     * get - gets dependency by name
     *
     * @param  {string} name
     * @returns {Service|Component|undefined}
     */
    get( name ) {
        return this.shared[ name ]
    }

    /**
     * get - services loaded
     *
     * @returns {Object}
     */
    get shared() {
        return this._shared
    }
}

module.exports = Container
