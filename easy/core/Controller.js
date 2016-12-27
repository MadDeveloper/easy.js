const ConfigLoader = require( 'easy/core/ConfigLoader' )

/**
 * @class Controller
 */
class Controller {
    /**
     * @constructor
     */
    constructor( container ) {
        this.container = container
        this.entityManager = this.em = container.getComponent( 'entitymanager' )
        this.router = container.getComponent( 'router' )
    }

    /**
     * verifyParams - verify params by type expected, can be optional
     *
     * @param  {object} required
     * @param  {object} params = {}
     * @returns {boolean}
     */
    verifyParams( required, params = {} ) {
        let verified = true

        for ( let requiredParam in required ) {
            const optional = required[ requiredParam ].optional

            if ( !params.hasOwnProperty( required[ requiredParam ].property ) ) {
                if ( !optional ) {
                    verified = false
                    break
                }
            } else if ( typeof params[ required[ requiredParam ].property ] !== required[ requiredParam ].typeExpected ) {
                if ( required[ requiredParam ].typeExpected === 'number' ) {
                    if ( !params[ required[ requiredParam ].property ].isNumber() ) {
                        verified = false
                        break
                    }
                } else {
                    verified = false
                    break
                }
            }
        }

        return verified
    }

    /**
     * parsePatchParams - parse body from patch http request
     *
     * @returns {object}
     */
    parsePatchParams() {
        try {
            return JSON.parse( this.request.getRawbody() )
        } catch ( error ) {}
    }

    /**
     * isPatchRequestWellParameterized - check if patch request is correct
     *
     * @returns {boolean}
     */
    isPatchRequestWellParameterized() {
        return this.request.getRawbody().length > 0
    }

    /**
     * getComponent - get easy component
     *
     * @param  {string} component
     * @returns {Component}
     */
    getComponent( component ) {
        return this.container.getComponent( component )
    }

    /**
     * getService - get service
     *
     * @param  {string} service
     * @returns {Injectable}
     */
    getService( service ) {
        return this.container.getService( service )
    }
}

module.exports = Controller
