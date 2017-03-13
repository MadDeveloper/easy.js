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
	 * @param {any} id
	 * @param {tring} controllerAction
	 * @returns {Middleware}
	 *
	 * @memberOf Middleware
	 */
	register( id, controllerAction ) {
		const [ controller, action ] = controllerAction.split( '.' )

		middlewares.set( id, { controller, action })

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
	static get middlewares() {
		return middlewares
	}
}

module.exports = Middleware
