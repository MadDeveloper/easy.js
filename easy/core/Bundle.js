/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const AnalyzerMiddlewaresConfig = require( '../middlewares/AnalyzerMiddlewaresConfig' )
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
        const controllers = this.loadControllers()

        for( let route in this._indexModule.routes ) {
            const routeConfig = this._indexModule.routes[ route ]

            /*
             * Security
             */
            this.defineSecurity( routeConfig, 'all', route )

            /*
             * Middlewares
             */
            this.defineMiddleware( routeConfig, 'all', controllers )

            /*
             * Methods
             */
            this.mapHttpMethods( routeConfig, route, controllers )
        }
    }

    /**
     * Load bundle controllers
     *
     * @returns {Object}
     *
     * @memberOf Bundle
     */
    loadControllers() {
        let controllers = {}

        for( let controller in this._indexModule.controllers ) {
            controllers[ controller ] = new this._indexModule.controllers[ controller ]( this.container )
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
     * @memberOf Bundle
     */
    defineSecurity( routeConfig, httpMethod = 'all', route ) {
        const analyzerSecurityConfig = new AnalyzerSecurityConfig( routeConfig )

        httpMethod = httpMethod.toLowerCase()

        if ( analyzerSecurityConfig.analyze() && ( Http.methods.includes( httpMethod ) || 'all' === httpMethod ) ) {
            this.router.defineSecurityRoute( route, httpMethod, routeConfig )
        }
    }

    /**
     * Define all middlewares for the specified route and http method if specified
     *
     * @param {Object} routeConfig
     * @param {string} [httpMethod='all']
     * @param {Object} controllers
     *
     * @memberOf Bundle
     */
    defineMiddleware( routeConfig, httpMethod, controllers ) {
        const analyzerMiddlewaresConfig = new AnalyzerMiddlewaresConfig( routeConfig )

        httpMethod = httpMethod.toLowerCase()

        if ( analyzerMiddlewaresConfig.analyze() && ( Http.methods.includes( httpMethod ) || 'all' === httpMethod ) ) {
            this.router.defineMiddlewaresRoutes( routeConfig, httpMethod, controllers )
        }
    }

    /**
     * Map all http methods with correct controller method
     *
     * @param {Object} routeConfig
     * @param {string} route
     * @param {Object} controllers
     *
     * @memberOf Bundle
     */
    mapHttpMethods( routeConfig, route, controllers ) {
        for ( let httpMethod in routeConfig ) {
            const configValue = routeConfig[ httpMethod ]

            if ( Http.methods.includes( httpMethod ) ) {
                const [ controllerId, controllerMethod ] = configValue.controller.split( ':' )

                this.defineSecurity( routeConfig[ httpMethod ], httpMethod, route )
                this.defineMiddleware( routeConfig[ httpMethod ], httpMethod, controllers )

                this.router.defineRoute({
                    route,
                    method: httpMethod,
                    controller: controllers[ controllerId ],
                    controllerMethod: controllerMethod
                })
            }
        }

        this.router.defineMethodNotAllowedRoute( route )
    }

    /**
     * Get the index module exports
     *
     * @readonly
     *
     * @memberOf Bundle
     */
    get indexModule() {
        return this._indexModule
    }

    /**
     * Get router
     * 
     * @readonly
     * 
     * @memberOf Bundle
     */
    get router() {
        return this._router
    }

    /**
     * Get container
     * 
     * @readonly
     * 
     * @memberOf Bundle
     */
    get container() {
        return this._container
    }
}

module.exports = Bundle
