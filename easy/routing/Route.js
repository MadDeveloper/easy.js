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
	 * @param {string} action
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static get( route, action ) {
		Route.router.route( route, 'get', action )
		lastRoute = { route, method: 'get' }

		return Route
	}

	/**
	 * Define POST route
	 *
	 * @static
	 * @param {string} route
	 * @param {string} action
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static post( route, action ) {
		Route.router.route( route, 'post', action )
		lastRoute = { route, method: 'post' }

		return Route
	}

	/**
	 * Define PUT route
	 *
	 * @static
	 * @param {string} route
	 * @param {string} action
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static put( route, action ) {
		Route.router.route( route, 'put', action )
		lastRoute = { route, method: 'put' }

		return Route
	}

	/**
	 * Define PATCH route
	 *
	 * @static
	 * @param {string} route
	 * @param {string} action
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static patch( route, action ) {
		Route.router.route( route, 'patch', action )
		lastRoute = { route, method: 'patch' }

		return Route
	}

	/**
	 * Define DELETE route
	 *
	 * @static
	 * @param {string} route
	 * @param {string} action
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static delete( route, action ) {
		Route.router.route( route, 'delete', action )
		lastRoute = { route, method: 'delete' }

		return Route
	}

	/**
	 * Define OPTIONS route
	 *
	 * @static
	 * @param {string} route
	 * @param {string} action
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static options( route, action ) {
		Route.router.route( route, 'options', action )
		lastRoute = { route, method: 'options' }

		return Route
	}

	/**
	 * Define route for all http methods
	 *
	 * @static
	 * @param {string} route
	 * @param {string} action
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static all( route, action ) {
		const methods = [ 'get', 'post', 'put', 'patch', 'delete', 'options' ]

		methods.forEach( method => Route[ method ]( route, action ) )

		return Route
	}

	static route( route, methods, action ) {
		if ( Array.isArray( methods ) ) {
			methods.forEach( method => Route.route( route, method, action ) )
		} else {
			Route[ methods ]( route, action )
		}

		return Route
	}

	/**
	 * Define security rules for the last route
	 *
	 * @static
	 * @param {Object} configurations
	 * @return {Route}
	 *
	 * @memberOf Route
	 */
	static security( configurations ) {
		Route.router.security( lastRoute.route, lastRoute.method, configurations )

		return this
	}

	/**
	 * Define use of a middleware for the last route
	 *
	 * @static
	 * @param {any} id
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static middleware( id ) {
		Route.router.middleware( lastRoute.route, lastRoute.method, configurations )

		return this
	}

	/**
	 * Define use of many middlewares for the last route
	 *
	 * @static
	 * @param {any} ids
	 * @returns
	 *
	 * @memberOf Route
	 */
	static middlewares( ids ) {
		ids.forEach( id => Route.middleware( id ) )

		return this
	}

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
