/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Configuration = require( './Configuration' )

/**
 * @class Controller
 */
class Controller {
    /**
     * @constructor
	 * @param {Container} container
     */
    constructor( container ) {
        this._container = container
        this._databasesManager = container.get( 'databasesmanager' )
    }

    /**
     * Get an entity manager
     *
     * @param {string} [name='default']
     * @returns {EntityManager}
     */
    entityManager( name = 'default' ) {
        return this._databasesManager.entityManager( name )
    }

    /**
     * Get repository on default entity manager
     *
     * @param {string} repository
     * @returns {Repository}
     *
     * @memberOf Controller
     */
    repository( repository ) {
        return this.entityManager().repository( repository )
    }

    /**
     * Verify params by type expected
     *
     * @param {object} [required={}]
     * @param {object} [params={}]
     * @returns {boolean}
     */
    verifyParams( required = {}, params = {}) {
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
     * Get container dependency by id
     *
     * @param {string} id
     * @returns {Object}
     */
    get( id ) {
        return this.container.get( id )
    }

    /**
     * Get the application container
     *
     * @readonly
     *
     * @returns {Container}
     *
     * @memberOf Controller
     */
    get container() {
        return this._container
    }
}

module.exports = Controller
