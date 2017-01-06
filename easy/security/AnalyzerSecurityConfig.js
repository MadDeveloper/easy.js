const Access = require( 'easy/security/Access' )
const { Analyzer } = require( 'easy/interfaces' )

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
        if ( configurations.hasOwnProperty( 'security' ) ) {
            const security = configurations.security

            if ( security.hasOwnProperty( 'strategy' ) ) {
                return security.hasOwnProperty( 'rules' )
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
