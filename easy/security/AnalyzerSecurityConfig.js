/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Access = require( './Access' )
const Analyzer = require( '../interfaces/Analyzer' )

/**
 * @class AnalyzerSecurityConfig
 * @extends Analyzer
 */
class AnalyzerSecurityConfig extends Analyzer {
    /**
     * Creates an instance of AnalyzerSecurityConfig.
     * @param {Object} [configurations={}] 
     * 
     * @memberOf AnalyzerSecurityConfig
     */
    constructor( configurations = {} ) {
        super()

        this._configurations = configurations
    }

    /**
     * Check if configurations are valids
     * 
     * @returns {boolean}
     */
    analyze() {
        if ( 'security' in this.configurations ) {
            const security = this.configurations.security

            if ( 'strategy' in security ) {
                return 'roles' in security
            }
        }

        return false
    }

    /**
     * Extract security configurations into app configurations
     *
     * @returns {Object}
     */
    extractSecurityConfig() {
        return this.configurations.security
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

module.exports = AnalyzerSecurityConfig
