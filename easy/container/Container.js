const fs        = require( 'fs' )
const Console   = require( 'easy/core/Console' )

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
     * register - description
     *
     * @param  {type} name       description
     * @param  {type} dependency description
     * @returns {type}            description
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
