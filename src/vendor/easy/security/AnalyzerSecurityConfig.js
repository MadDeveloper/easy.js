import Access       from './Access'
import Analyzer     from './../interfaces/Analyzer'
import { indexOf }  from 'lodash'

/**
 * @class AnalyzerSecurityConfig
 * @extends Analyzer
 */
export default class AnalyzerSecurityConfig extends Analyzer {
    /**
     * constructor
     */
    constructor() {
        super()

        this.validsStratagies = [ 'default', 'custom' ]
    }

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
                const strategy = security.strategy

                if ( -1 !== indexOf( this.validsStratagies, strategy ) ) {
                    correct = security.rules ? true : false
                }
            }
        }

        return correct
    }

    extractSecurityConfig( configurations ) {
        return configurations.security
    }
}
