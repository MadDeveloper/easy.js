/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const express = require( 'express' )
const Route = require( './Route' )
const Configurable = require( '../interfaces/Configurable' )
const Request = require( '../http/Request' )
const Response = require( '../http/Response' )
const Access = require( '../security/Access' )
const extract = require( '../lib/extract' )
const Middleware = require( '../middleware/Middleware' )
const Group = require( './Group' )

/**
 * @class Router
 * @extends Configurable
 */
class Router extends Configurable {
    /**
     * @constructor
     */
    constructor() {
        super()

        this._scope = null
        this._container = null
        this._access = new Access()
        this._bundles = new Set()
    }

    /**
     * Configure easy router
     *
     * @param {Container} { container
	 * @param {Set|Bundle[]} bundles
     * @param {Object} router }
     * @returns {Router}
     */
    configure({ container, bundles, router }) {
        this._container = container
        this._bundles = bundles
        this._scope = router || express.Router()

        return this
    }

    /**
     * Define new middleware from configurations
     *
     * @param {Object} route
     * @param {string} method
     * @param {string} id
	 * @param {Object} [options={}]
     * @returns {Router}
     */
    middleware( route, method, id, options = {}) {
        const router = this.scope
        const middleware = this._findMiddleware( id )

        if ( !middleware ) {
            throw new ReferenceError( `Cannot load middleware, middleware ${id} hasn't been found` )
        }

        let action = middleware

        if ( this._isControllerMethod( middleware ) ) {
            action = this._findControllerAction( middleware )
        }

        method = method.toLowerCase()
		router.use( route, ( req, res, next ) => {
			const request = new Request( req )

			if ( ( 'all' === method || method === request.getMethod().toLowerCase() ) ) {
				const response = new Response( res )

                action( request, response, next )
			} else {
				next()
			}
		})

        return this
    }

    /**
     * Define access rules for specific route
     *
     * @param {string} route
     * @param {string} method
     * @param {Object} configurations
     * @return {Router}
     */
    security( route, method, configurations ) {
        const router = this.scope
        const handler = this.accessHandler( configurations )

        method = method.toLowerCase()

        router.use( route, ( req, res, next ) => {
            const request = new Request( req )

			if ( ( 'all' === method || method === request.getMethod().toLowerCase() ) ) {

				const response = new Response( res )

				try {
				    handler.authorize({
						configurations,
						request,
						response,
                        next,
						container: this._container
					})
				} catch ( error ) {
					response.internalServerError()
				}
            } else {
                next()
            }
        })

        return this
    }

    /**
     * Define route into express router
     *
     * @param {string} route
     * @param {string} method
     * @param {string} action
     * @returns {Router}
     */
    route( route, method, action ) {
        const router = this.scope

		if ( this._isControllerMethod( action ) ) {
            action = this._findControllerAction( action )
		}

        method = method.toLowerCase()
        router.route( route )[ method ]( ( req, res ) => action( new Request( req ), new Response( res ) ) )

        return this
    }

    /**
     * Mount router on app
     *
     * @param {string} path
     * @param {Object} app
     * @returns {Router}
     *
     * @memberOf Router
     */
    mount( path, app ) {
		this._mountRoutes()
        app.use( path, this.scope )

        return this
    }

	/**
	 * Mount all routes declared with Route
	 *
	 * @private
	 *
	 * @memberOf Router
	 */
	_mountRoutes() {
		Route.routes.forEach( route => {
            this._prefix( route )
            this._mountGroupSecurity( route )
			this._mountSecurity( route )
            this._mountGroupMiddlewares( route )
			this._mountMiddlewares( route )
			this.route( route.route, route.method, route.action )
		})
	}

    /**
     * Prefix route if group prefix was specified
     *
     * @param {Object} route
     *
     * @private
     *
     * @memberOf Router
     */
    _prefix( route ) {
        if ( route.group.length > 0 ) {
            const group = this._findGroup( route.group )

            if ( group.prefix ) {
                route.route = `${group.prefix}${route.route}`
            }
        }
    }

	/**
	 * Mount all security rules for the route
	 *
	 * @param {Object} route
	 *
	 * @private
	 *
	 * @memberOf Router
	 */
	_mountSecurity( route ) {
		route.security.forEach( security => this.security( route.route, route.method, security ) )
	}

    /**
     * Mount all security rules of the route group
     *
     * @param {Object} route
     *
     * @memberOf Router
     */
    _mountGroupSecurity( route ) {
        if ( route.group.length > 0 ) {
            const group = this._findGroup( route.group )

            group.security.forEach( security => this.security( route.route, route.method, security ) )
        }
    }

	/**
	 * Mount all middlewares for the route
	 *
	 * @param {Object} route
	 *
	 * @private
	 *
	 * @memberOf Router
	 */
	_mountMiddlewares( route ) {
		route.middlewares.forEach( middleware => this.middleware( route.route, route.method, middleware.id, middleware.options ) )
	}

    /**
     * Mount all middlewares of the route group
     *
     * @param {Object} route
     *
     * @memberOf Router
     */
    _mountGroupMiddlewares( route ) {
        if ( route.group.length > 0 ) {
            const group = this._findGroup( route.group )

            group.middlewares.forEach( middleware => this.middleware( route.route, route.method, middleware.id, middleware.options ) )
        }
    }

	/**
	 * Check if action is a method callable from a controller
	 *
	 * @param {any} action
	 * @returns {boolean}
	 *
	 * @private
	 *
	 * @memberOf Router
	 */
	_isControllerMethod( action ) {
		return 'string' === typeof action
	}

    /**
     * Find controller action
     *
     * @param {string} action
     * @returns {Function}
     *
     * @throws {ReferenceError} if the controller cannot be found in bundles
     *
     * @private
     *
     * @memberOf Router
     */
    _findControllerAction( action ) {
        const [ controllerId, controllerMethod ] = extract.controllerAndAction( action )
        const controller = this._findController( controllerId )

        if ( !controller ) {
            throw new ReferenceError( `Cannot load controller's action, controller ${controllerId} hasn't been found in bundles list` )
        }

        return controller[ controllerMethod ].bind( controller )
    }

    /**
     * Find controller from it's id
     *
     * @param {string} id
     * @returns {Controller}
     *
     * @private
     *
     * @memberOf Router
     */
    _findController( id ) {
        let controller

        for ( let bundle of this._bundles ) {
            if ( bundle.hasController( id ) ) {
                controller = bundle.controller( id )
                break
            }
        }

        return controller
    }

    /**
     * Find the middleware from it's id
     *
     * @param {string} id
     * @returns {Object}
     *
     * @memberOf Router
     */
    _findMiddleware( id ) {
        return Middleware.middlewares.get( id )
    }

    /**
     * Find the group from it's id
     *
     * @param {string} id
     * @returns {Object}
     *
     * @memberOf Router
     */
    _findGroup( id ) {
        return Group.groups.get( id )
    }

    /**
     * Returns access authority handler
     *
     * @param {Object} configurations
     * @returns {SecurityAccess}
     */
    accessHandler( configurations ) {
        return 'default' === configurations.strategy ? this.access : this._container.get( configurations.provider )
    }

	/**
	 * Add not found route
     *
     * @returns {Router}
	 */
	notFound() {
		const router = this.scope

	    router.use( ( req, res ) => {
			const response = new Response( res )

	        if ( !response.headersAlreadySent() ) {
	            response.notFound()
	        }
	    })

        return this
	}

    /**
     * Define route on all http verbs which returns 405 Method Not Allowed
     *
     * @param {string} route
     * @returns {Router}
     */
    methodNotAllowed( route ) {
        const router = this.scope

        router.route( route ).all( ( req, res ) => new Response( res ).methodNotAllowed() )

        return this
    }

    /**
     * Get express router
     *
     * @returns {Object}
     */
    get scope() {
        return this._scope
    }

	/**
	 * Get security access instance
	 *
	 * @readonly
	 *
	 * @returns {SecurityAccess}
	 *
	 * @memberOf Router
	 */
	get access() {
		return this._access
	}

	/**
	 * Get all bundles
	 *
	 * @returns {Set}
	 *
	 * @memberOf Router
	 */
	get bundles() {
		return this._bundles
	}

	/**
	 * Set bundles
	 *
	 * @param {Set} bundes
	 *
	 * @memberOf Router
	 */
	set bundles( bundles ) {
		this._bundles = new Set( bundles )
	}
}

module.exports = Router
