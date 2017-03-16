/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const groups = new Map()

/**
 * @class Group
 */
class Group {
    /**
     * Creates an instance of Group.
     * @param {string} id
     *
     * @memberOf Group
     */
    constructor( id ) {
        this._id = id
        this._state = {
            prefix: '',
            middlewares: [],
            security: []
        }

        groups.set( this._id, this._state )
    }

    /**
     * Prefix routes in the context
     *
     * @param {string} prefix
     * @returns {Group}
     *
     * @memberOf Group
     */
    prefix( prefix ) {
        if ( 'string' === typeof prefix ) {
            this._state.prefix = prefix
            this.update()
        }

        return this
    }

    /**
     * Configure security rules on all routes in the context
     *
     * @param {Object} configurations
     * @returns {Group}
     *
     * @memberOf Group
     */
    security( configurations ) {
        this._state.security.push( configurations )
        this.update()

        return this
    }

    /**
     * Configure one or many middlewares on all routes in the context
     *
     * @param {any} ids
     * @param {any} [options={}]
     * @returns {Group}
     *
     * @memberOf Group
     */
    middleware( ids, options = {}) {
        if ( Array.isArray( ids ) ) {
            ids.forEach( id => this.middleware( ids, options ) )
        } else {
            this._state.middlewares.push({ id: ids, options })
            this.update()
        }

        return this
    }

    /**
     * Update group state
     *
     * @returns {Group}
     *
     * @memberOf Group
     */
    update() {
        groups.set( this._id, this._state )

        return this
    }

    /**
     * Get group id
     *
     * @returns {string}
     *
     * @readonly
     *
     * @memberOf Group
     */
    get id() {
        return this._id
    }

    /**
     * Get all groups
     *
     * @static
     * @returns {Object[]}
     *
     * @memberOf Group
     */
    static get groups() {
        return groups
    }
}

module.exports = Group
