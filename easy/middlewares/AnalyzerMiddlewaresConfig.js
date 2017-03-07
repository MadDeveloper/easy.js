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
     * Creates an instance of AnalyzerMiddlewaresConfig.
     * @param {Object} [configurations={}]
     *
     * @memberOf AnalyzerMiddlewaresConfig
     */
    constructor( configurations = {}) {
        super()

        this._configurations = configurations
    }

    /**
     * Check if middlewares configurations are correct
     *
     * @returns {boolean}
     */
    analyze() {
        return 'middlewares' in this.configurations && Reflect.ownKeys( this.configurations.middlewares ).length > 0
    }

    /**
     * Extract middlewares configurations from application configurations
     *
     * @returns {Object}
     */
    extractMiddlewaresConfig() {
        return this.configurations.middlewares
    }

    /**
     * Extract middleware informations necessary for express router
     *
     * @param {Object} configurations
     * @returns {Object}
     */
    extractMiddlewareConfig( configurations ) {
        return {
            type: 'use' in configurations ? 'use' : 'param',
            param: configurations.use || configurations.param,
            controller: configurations.controller
        }
    }

    /**
     * Get configurations
     *
     * @readonly
     *
     * @memberOf AnalyzerSecurityConfig
     */
    get configurations() {
        return this._configurations
    }

    /**
     * Set configurations
     *
     * @memberOf AnalyzerSecurityConfig
     */
    set configurations( value ) {
        this._configurations = value
    }
}

module.exports = AnalyzerMiddlewaresConfig
