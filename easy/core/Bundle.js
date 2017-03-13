/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const AnalyzerMiddlewaresConfig = require( '../middleware/AnalyzerMiddlewaresConfig' )
const AnalyzerSecurityConfig = require( '../security/AnalyzerSecurityConfig' )
const Http = require( '../http/Http' )

/**
 * @class Bundle
 */
class Bundle {
    /**
     * Creates an instance of Bundle.
     * @param {Object} indexModule
     * @param {Router} router
     * @param {Container} container
     *
     * @memberOf Bundle
     */
    constructor( indexModule, router, container ) {
        this._indexModule = indexModule
        this._router = router
        this._container = container
    }

    /**
     * Load bundle (parse configurations, map routes with controllers methods, etc.)
     *
     * @memberOf Bundle
     */
    load() {
        const controllers = this._loadControllers()

        for( let route in this._indexModule.routes ) {
            const routeConfig = this._indexModule.routes[ route ]

            /*
             * Security
             */
            this._defineSecurity( routeConfig, 'all', route )

            /*
             * Middlewares
             */
            this._defineMiddleware( routeConfig, 'all', controllers )

            /*
             * Methods
             */
            this._mapHttpMethods( routeConfig, route, controllers )
        }
    }

    /**
     * Load bundle controllers
     *
     * @returns {Object}
	 *
	 * @private
     *
     * @memberOf Bundle
     */
    _loadControllers() {
        let controllers = {}

        for( let controller in this._indexModule.controllers ) {
            controllers[ controller ] = new this._indexModule.controllers[ controller ]( this._container )
        }

        return controllers
    }

    /**
     * Define all security rules for the specified route and http method if specified
     *
     * @param {Object} routeConfig
     * @param {string} [httpMethod='all']
     * @param {string} route
	 *
	 * @private
     *
     * @memberOf Bundle
     */
    _defineSecurity( routeConfig, httpMethod = 'all', route ) {
        const analyzerSecurityConfig = new AnalyzerSecurityConfig( routeConfig )

        httpMethod = httpMethod.toLowerCase()

        if ( analyzerSecurityConfig.analyze() && ( Http.methods.includes( httpMethod ) || 'all' === httpMethod ) ) {
            this._router.security( route, httpMethod, routeConfig )
        }
    }

    /**
     * Define all middlewares for the specified route and http method if specified
     *
     * @param {Object} routeConfig
     * @param {string} [httpMethod='all']
     * @param {Object} controllers
	 *
	 * @private
     *
     * @memberOf Bundle
     */
    _defineMiddleware( routeConfig, httpMethod, controllers ) {
        const analyzerMiddlewaresConfig = new AnalyzerMiddlewaresConfig( routeConfig )

        httpMethod = httpMethod.toLowerCase()

		if ( analyzerMiddlewaresConfig.analyze() && ( Http.methods.includes( httpMethod ) || 'all' === httpMethod ) ) {
			const middlewaresConfig = analyzerMiddlewaresConfig.extractMiddlewaresConfig()

			for ( let config in middlewaresConfig ) {
				this._router.middleware( middlewaresConfig[ config ], httpMethod, controllers )
			}
		}
    }

    /**
     * Map all http methods with correct controller method
     *
     * @param {Object} routeConfig
     * @param {string} route
     * @param {Object} controllers
	 *
	 * @private
     *
     * @memberOf Bundle
     */
    _mapHttpMethods( routeConfig, route, controllers ) {
        for ( let httpMethod in routeConfig ) {
            const configValue = routeConfig[ httpMethod ]

            if ( Http.methods.includes( httpMethod ) ) {
                this._defineSecurity( routeConfig[ httpMethod ], httpMethod, route )
                this._defineMiddleware( routeConfig[ httpMethod ], httpMethod, controllers )

                this._router.route(
                    route,
                    httpMethod,
                    configValue.controller
                )
            }
        }

        this._router.methodNotAllowed( route )
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
}

module.exports = Bundle
