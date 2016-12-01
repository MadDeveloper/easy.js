const Access        = require( './Access' )
const Analyzer      = require( './../interfaces/Analyzer' )

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
        let correct = false

        if ( configurations.security ) {
            const security = configurations.security

            if ( security.strategy ) {
                correct = security.rules ? true : false
            }
        }

        return correct
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
