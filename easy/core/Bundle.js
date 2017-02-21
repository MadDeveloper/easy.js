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
        this.router = router
        this.container = container
        this.analyzerSecurityConfig = new AnalyzerSecurityConfig()
        this.analyzerMiddlewaresConfig = new AnalyzerMiddlewaresConfig()
        this.http = new Http()
    }

    /**
     * Load bundle (parse configurations, map routes with controllers methods, etc.)
     *
     * @memberOf Bundle
     */
    load() {
        const controllers = this.loadControllers()

        for( let routeName in this._indexModule.routes ) {
            const routeConfig = this._indexModule.routes[ routeName ]

            /*
             * Security
             */
             this.defineSecurity( routeConfig, routeName )

            /*
             * Middlewares
             */
            this.defineMiddleware( routeConfig, controllers )

            /*
             * Methods
             */
             this.mapHttpMethods( routeConfig, routeName, controllers )
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
     * Define all security rules for the specified route
     *
     * @param {Object} routeConfig
     * @param {string} routeName
     *
     * @memberOf Bundle
     */
    defineSecurity( routeConfig, routeName ) {
        if ( this.analyzerSecurityConfig.analyze( routeConfig ) ) {
            this.router.defineAccessRoute( routeName, routeConfig )
        }
    }

    /**
     * Define all middlewares for the specified route
     *
     * @param {Object} routeConfig
     * @param {Object} controllers
     *
     * @memberOf Bundle
     */
    defineMiddleware( routeConfig, controllers ) {
        if ( this.analyzerMiddlewaresConfig.analyze( routeConfig ) ) {
            this.router.defineMiddlewaresRoutes( routeConfig, controllers )
        }
    }

    /**
     * Map all http methods with correct controller method
     *
     * @param {Object} routeConfig
     * @param {string} routeName
     * @param {Object} controllers
     *
     * @memberOf Bundle
     */
    mapHttpMethods( routeConfig, routeName, controllers ) {
        for ( let config in routeConfig ) {
            const configValue = routeConfig[ config ]

            if ( this.http.methods.includes( config ) ) {
                const [ controllerId, controllerMethod ] = configValue.split( ':' )

                this.router.defineRoute({
                    route: routeName,
                    method: config,
                    controller: controllers[ controllerId ],
                    controllerMethod: controllerMethod
                })
            }
        }

        this.router.defineMethodNotAllowedRoute( routeName )
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
}

module.exports = Bundle
