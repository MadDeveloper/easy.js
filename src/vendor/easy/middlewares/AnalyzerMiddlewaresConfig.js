const Analyzer  = require( './../interfaces/Analyzer' )

/**
 * @class AnalyzerMiddlewaresConfig
 * @extends Analyzer
 */
class AnalyzerMiddlewaresConfig extends Analyzer {
    /**
     * analyze - check if middlewares configurations are correct
     *
     * @param  {Object} configurations
     * @returns {boolean}
     */
    analyze( configurations ) {
        return configurations.middlewares ? true : false
    }

    /**
     * extractMiddlewaresConfig - extract middlewares configurations from application configurations
     *
     * @param  {Object} configurations
     * @returns {Object}
     */
    extractMiddlewaresConfig( configurations ) {
        return configurations.middlewares
    }

    /**
     * extractMiddleware - extract single middleware configurations
     *
     * @param  {Object} configurations
     * @returns {Object}
     */
    extractMiddleware( configurations ) {
        return configurations.middleware
    }

    /**
     * extractMiddlewareInfos - extract middleware informations necessary for express router
     *
     * @param  {Object} configurations
     * @returns {Object}
     */
    extractMiddlewareInfos( configurations ) {
        return {
            type: undefined !== configurations.use ? 'use' : 'param',
            param: undefined !== configurations.use || configurations.param,
            middleware: configurations.middleware
        }
    }
}

module.exports = AnalyzerMiddlewaresConfig
