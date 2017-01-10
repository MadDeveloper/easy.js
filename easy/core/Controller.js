/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const ConfigLoader = require( './ConfigLoader' )

/**
 * @class Controller
 */
class Controller {
    /**
     * @constructor
     */
    constructor( container ) {
        this.container = container
        this.entityManager = this.em = container.get( 'component.entitymanager' )
        this.router = container.get( 'component.router' )
    }

    /**
     * verifyParams - verify params by type expected, can be optional
     *
     * @param  {object} required
     * @param  {object} params = {}
     * @returns {boolean}
     */
    verifyParams( required, params = {}) {
        let verified = true

        for ( let requiredParam in required ) {
            const optional = required[ requiredParam ].optional

            if ( !params.hasOwnProperty( required[ requiredParam ].property ) ) {
                if ( !optional ) {
                    verified = false
                    break
                }
            } else if ( typeof params[ required[ requiredParam ].property ] !== required[ requiredParam ].typeExpected ) {
                if ( 'number' === required[ requiredParam ].typeExpected ) {
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
     * get - get container element from id
     *
     * @param {string} id
     *
     * @returns {Service|Component}
     */
    get( id ) {
        return this.container.get( id )
    }
}

module.exports = Controller
