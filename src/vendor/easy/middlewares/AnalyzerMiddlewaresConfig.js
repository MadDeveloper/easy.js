const Analyzer  = require( './../interfaces/Analyzer' )

/**
 * @class AnalyzerMiddlewaresConfig
 * @extends Analyzer
 */
module.exports = class AnalyzerMiddlewaresConfig extends Analyzer {
    /**
     * analyze - description
     *
     * @param  {type} configurations description
     * @returns {type}                description
     */
    analyze( configurations ) {
        return configurations.middlewares ? true : false
    }

    /**
     * extractMiddlewaresConfig - description
     *
     * @param  {type} configurations description
     * @returns {type}                description
     */
    extractMiddlewaresConfig( configurations ) {
        return configurations.middlewares
    }

    /**
     * extractMiddleware - description
     *
     * @param  {type} configurations description
     * @returns {type}                description
     */
    extractMiddleware( configurations ) {
        return configurations.middleware
    }

    /**
     * extractMiddlewareInfos - description
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
