const Access        = require( './Access' )
const Analyzer      = require( './../interfaces/Analyzer' )

/**
 * @class AnalyzerSecurityConfig
 * @extends Analyzer
 */
module.exports = class AnalyzerSecurityConfig extends Analyzer {
    /**
     * analyze - description
     *
     * @param  {type} configurations description
     * @returns {type}                description
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
     * extractSecurityConfig - description
     *
     * @param  {type} configurations description
     * @returns {type}                description
     */
    extractSecurityConfig( configurations ) {
        return configurations.security
    }
}
