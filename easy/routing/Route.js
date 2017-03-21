/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Group = require( './Group' )

let router = {}
let lastRoute = {
	route: '',
	method: '',
	group: ''
}
let lastGroup = ''
const routes = []

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
		Route.route( route, 'get', action )

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
		Route.route( route, 'post', action )

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
		Route.route( route, 'put', action )

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
		Route.route( route, 'patch', action )

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
		Route.route( route, 'delete', action )

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
		Route.route( route, 'options', action )

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

	/**
	 * Define a route
	 *
	 * @static
	 * @param {string} route
	 * @param {string[]|string} methods
	 * @param {string|Function} action
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static route( route, methods, action ) {
		if ( Array.isArray( methods ) ) {
			methods.forEach( method => Route.route( route, method, action ) )
		} else {
			lastRoute = {
				route,
				method: methods,
				action,
				middlewares: [],
				security: [],
				group: lastGroup
			}
			Route.routes.push( lastRoute )
		}

		return Route
	}

	/**
	 * Define one or many security rules for the last route
	 *
	 * @static
	 * @param {Object|Object[]} configurations
	 * @return {Route}
	 *
	 * @memberOf Route
	 */
	static security( configurations ) {
		if ( Array.isArray( configurations ) ) {
			configurations.forEach( configuration => Route.security( configuration ) )
		} else {
			Route._appendSecurity( configurations, lastRoute )
		}

		return Route
	}

	/**
	 * Define use of one or many middlewares for the last route
	 *
	 * @static
	 * @param {string[]|string} ids
	 * @param {Object} options
	 * @returns {Route}
	 *
	 * @memberOf Route
	 */
	static middleware( ids, options = {}) {
		if ( Array.isArray( ids ) ) {
			ids.forEach( id => Route.middleware( id, options ) )
		} else {
			Route._appendMiddleware( ids, lastRoute, options )
		}

		return Route
	}

	/**
	 * Define a group for all routes in the context
	 *
	 * @static
	 * @param {string} id
	 * @param {Function} context
	 * @returns {Group}
	 *
	 * @memberOf Route
	 */
	static group( id, context ) {
		lastGroup = id
		context()
		lastGroup = ''

		return new Group( id )
	}

	/**
	 * Append middleware to a specific route
	 *
	 * @static
	 * @param {string} id
	 * @param {Object} route
	 * @param {Object} options
	 *
	 * @private
	 *
	 * @memberOf Route
	 */
	static _appendMiddleware( id, route, options ) {
		routes.forEach( current => {
			if ( current.route === route.route ) {
				route.middlewares.push({ id, options })
			}
		})
	}

	/**
	 * Append middleware to a specific route
	 *
	 * @static
	 * @param {Object} configurations
	 * @param {Object} route
	 *
	 * @private
	 *
	 * @memberOf Route
	 */
	static _appendSecurity( configurations, route ) {
		routes.forEach( current => {
			if ( current.route === route.route ) {
				route.security.push( configurations )
			}
		})
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

	/**
	 * Get all routes
	 *
	 * @readonly
	 * @static
	 * @returns {Object[]}
	 *
	 * @memberOf Route
	 */
	static get routes() {
		return routes
	}

	/**
	 * Get the last route defined
	 *
	 * @returns {Object}
	 *
	 * @readonly
	 * @static
	 *
	 * @memberOf Route
	 */
	static get lastRoute() {
		return lastRoute
	}

	/**
	 * Get the last group defined
	 *
	 * @returns {Object}
	 *
	 * @readonly
	 * @static
	 *
	 * @memberOf Route
	 */
	static get lastGroup() {
		return lastGroup
	}
}

module.exports = Route