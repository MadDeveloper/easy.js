/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const middlewares = new Map()

/**
 * @class Middleware
 */
class Middleware {
	/**
	 * Register new middleware
	 *
	 * @static
	 * @param {any} id
	 * @param {string} controllerAction
	 * @returns {Middleware}
	 *
	 * @memberOf Middleware
	 */
	static register( id, action ) {
		middlewares.set( id, action )

		return this
	}

	/**
	 * Get all registered middlewares
	 *
	 * @static
	 * @returns {Map}
	 *
	 * @memberOf Middleware
	 */
	static all() {
		return middlewares
	}
}

module.exports = Middleware
