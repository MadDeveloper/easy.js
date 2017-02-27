/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Analyzer = require( '../interfaces/Analyzer' )

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
        return 'middlewares' in configurations && Object.keys( configurations.middlewares ).length > 0
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
        return configurations.controller
    }

    /**
     * extractMiddlewareInfos - extract middleware informations necessary for express router
     *
     * @param  {Object} configurations
     * @returns {Object}
     */
    extractMiddlewareInfos( configurations ) {
        return {
            type: 'use' in configurations ? 'use' : 'param',
            param: configurations.use || configurations.param,
            middleware: configurations.controller
        }
    }
}

module.exports = AnalyzerMiddlewaresConfig
