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
     * getEntityManager - get entity manager
     *
     * @param {string} [name=default]
     *
     * @returns {EntityManager}
     */
    getEntityManager( name = 'default' ) {
        return this.container.get( 'component.databasesmanager' ).getEntityManager( name )
    }


    /**
     * getRepository - shortcut to get repository on default entity manager
     *
     * @param {string} repository
     * @returns {Repository}
     *
     * @memberOf Controller
     */
    getRepository( repository ) {
        return this.getEntityManager().getRepository( repository )
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
