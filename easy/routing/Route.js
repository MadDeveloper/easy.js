/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

let router = {}
let lastRoute = {
	route: '',
	method: ''
}

/**
 * @class Route
 */
class Route {
	/**
	 * Define GET route
	 *
	 * @static
	 * @param {string} route
	 * @param {string} controllerAction
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static get( route, controllerAction ) {
		Route.router.route( route, 'get', controllerAction )
		lastRoute = { route, method: 'get' }

		return Route
	}

	/**
	 * Define POST route
	 *
	 * @static
	 * @param {string} route
	 * @param {string} controllerAction
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static post( route, controllerAction ) {
		Route.router.route( route, 'post', controllerAction )
		lastRoute = { route, method: 'post' }

		return Route
	}

	/**
	 * Define PUT route
	 *
	 * @static
	 * @param {string} route
	 * @param {string} controllerAction
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static put( route, controllerAction ) {
		Route.router.route( route, 'put', controllerAction )
		lastRoute = { route, method: 'put' }

		return Route
	}

	/**
	 * Define PATCH route
	 *
	 * @static
	 * @param {string} route
	 * @param {string} controllerAction
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static patch( route, controllerAction ) {
		Route.router.route( route, 'patch', controllerAction )
		lastRoute = { route, method: 'patch' }

		return Route
	}

	/**
	 * Define DELETE route
	 *
	 * @static
	 * @param {string} route
	 * @param {string} controllerAction
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static delete( route, controllerAction ) {
		Route.router.route( route, 'delete', controllerAction )
		lastRoute = { route, method: 'delete' }

		return Route
	}

	/**
	 * Define OPTIONS route
	 *
	 * @static
	 * @param {string} route
	 * @param {string} controllerAction
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static options( route, controllerAction ) {
		Route.router.route( route, 'options', controllerAction )
		lastRoute = { route, method: 'options' }

		return Route
	}

	/**
	 * Define route for all http methods
	 *
	 * @static
	 * @param {string} route
	 * @param {string} controllerAction
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static all( route, controllerAction ) {
		const methods = [ 'get', 'post', 'put', 'patch', 'delete', 'options' ]

		methods.forEach( method => Route[ method ]( route, controllerAction ) )

		return Route
	}

	static route( route, methods, controllerAction ) {
		if ( Array.isArray( methods ) ) {
			methods.forEach( method => Route.route( route, method, controllerAction ) )
		} else {
			Route[ methods ]( route, controllerAction )
		}

		return Route
	}

	/**
	 * Define security rules for last route
	 *
	 * @static
	 *
	 * @param {Object} configurations
	 * @return {Route}
	 *
	 * @memberOf Route
	 */
	static security( configurations ) {
		Route.router.security( lastRoute.route, lastRoute.method, configurations )

		return this
	}

	static middleware() {}
	static middlewares() {}

	/**
	 * Get the router
	 *
	 * @returns {Router}
	 *
	 * @readonly
	 * @static
	 *
	 * @memberOf Route
	 */
	static get router() {
		return router
	}

	/**
	 * Set router instance
	 *
	 * @static
	 *
	 * @memberOf Route
	 */
	static set router( value ) {
		router = value
	}
}

module.exports = Route
