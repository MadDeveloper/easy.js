/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * @class Bundle
 */
class Bundle {
    /**
     * Creates an instance of Bundle.
     * @param {Object} indexModule
     * @param {Container} container
     *
     * @memberOf Bundle
     */
    constructor( indexModule, container ) {
        this._indexModule = indexModule
        this._container = container
        this._controllers = new Map()
    }

    /**
     * Load bundle
     *
     * @memberOf Bundle
     */
    load() {
        this._loadControllers()
        this._loadMiddlewares()
        this._loadRoutes()
    }

    /**
     * Load bundle controllers
	 *
	 * @private
     *
     * @memberOf Bundle
     */
    _loadControllers() {
        for( let controller in this.indexModule.controllers ) {
            this.controllers.set( controller, new this.indexModule.controllers[ controller ]( this._container ) )
        }
    }

    /**
     * Load bundle middlewares
     *
     * @private
     *
     * @throws {ReferenceError} if path to the middlewares file is incorrect
     *
     * @memberOf Bundle
     */
    _loadMiddlewares() {
        try {
            require( this.indexModule.middlewares )
        } catch ( error ) {
            throw new ReferenceError( `Cannot load middlewares of bundle ${this.name}\n${error.stack}` )
        }
    }

    /**
     * Load bundle routing
     *
     * @private
     *
     * @throws {ReferenceError} if path to the routes file is incorrect
     *
     * @memberOf Bundle
     */
    _loadRoutes() {
        try {
            require( this.indexModule.routes )
        } catch ( error ) {
            throw new ReferenceError( `Cannot load routes of bundle ${this.name}\n${error.stack}` )
        }
    }

    /**
     * Check if bundle contains loaded controller
     *
     * @param {string} id
     * @returns {boolean}
     *
     * @memberOf Bundle
     */
    hasController( id ) {
        return this.controllers.has( id )
    }

    /**
     * Get controller by id
     *
     * @param {string} id
     * @returns {Controller}
     *
     * @memberOf Bundle
     */
    controller( id ) {
        return this.controllers.get( id )
    }

    /**
     * Get the index module exports
	 *
	 * @returns {Object}
     *
     * @readonly
     *
     * @memberOf Bundle
     */
    get indexModule() {
        return this._indexModule
    }

    /**
     * Get name of the bundle
     *
     * @returns {string}
     *
     * @readonly
     *
     * @memberOf Bundle
     */
    get name() {
        return this.indexModule.name
    }

    /**
     * Get all bundle controllers
     *
     * @returns {Map}
     *
     * @readonly
     *
     * @memberOf Bundle
     */
    get controllers() {
        return this._controllers
    }
}

module.exports = Bundle
