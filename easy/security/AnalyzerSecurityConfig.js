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
     * analyze - check if configurations are valids
     *
     * @param  {Object} configurations
     * @returns {boolean}
     */
    analyze( configurations ) {
        if ( 'security' in configurations ) {
            const security = configurations.security

            if ( 'strategy' in security ) {
                return 'rules' in security
            }
        }

        return false
    }

    /**
     * extractSecurityConfig - extract security configurations into app configurations
     *
     * @param  {Object} configurations
     * @returns {Object}
     */
    extractSecurityConfig( configurations ) {
        return configurations.security
    }
}

module.exports = AnalyzerSecurityConfig
