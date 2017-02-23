/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const ConfigLoader = require( '../core/ConfigLoader' )
const SecurityAccess = require( '../interfaces/SecurityAccess' )
const roles = ConfigLoader.loadFromGlobal( 'roles' )

/**
 * @class Access
 * @extends SecurityAccess
 */
class Access extends SecurityAccess {
    /**
     * @constructor
     */
    constructor() {
        super()

        this.loadRoles()
        this._restrictions = {}
    }

    /**
     * loadRoles - load roles config
     */
    loadRoles() {
        for ( let role in roles ) {
            this[ role ] = roles[ role ]
        }
    }

    /**
     * focusOn - specify the focus field to focus on
     *
     * @param  {string|number} focus
     * @returns {Access}
     */
    focusOn( focus ) {
        this._focus = focus

        return this
    }

    /**
     * restrict - define rules
     *
     * @param  {Array} { mustBe = []
     * @param  {Array} canCreate = []
     * @param  {Array} canRead = []
     * @param  {Array} canUpdate = []
     * @param  {Array} canDelete = [] }
     * @returns {Access}
     */
    restrict({ mustBe = [], canCreate = [], canRead = [], canUpdate = [], canDelete = [] }) {
        if ( !mustBe || 0 === mustBe.length ) {
            mustBe = [ this.any ]
        }

        if ( !canCreate || 0 === canCreate.length ) {
            canCreate = mustBe
        }

        if ( !canRead || 0 === canRead.length ) {
            canRead = mustBe
        }

        if ( !canUpdate || 0 === canUpdate.length ) {
            canUpdate = mustBe
        }

        if ( !canDelete || 0 === canDelete.length ) {
            canDelete = mustBe
        }

        this.restrictions = {
            mustBe,
            canCreate,
            canRead,
            canUpdate,
            canDelete
        }

        return this
    }

    /**
     * authorized - check if user is authorized to access to the route requested
     *
     * @param  {Object} { configurations
     * @param  {Request} request
     * @param  {Response} response
     * @param  {Container} container }
     * @returns {boolean}
     */
    async authorized({ configurations, request, response, container }) {
        let isAuthorizedToAccess = false
        let authorized = false
        const method = request.getMethod().toLowerCase()
        const user = request.getAppParameter( 'user' )

        this.restrict( configurations.rules ).focusOn( user[ configurations.focus ])

        authorized = this.restrictions.mustBe.includes( this.focus ) || this.restrictions.mustBe.includes( this.any )

        if ( authorized ) {

            const methodWhenReading = [ 'get', 'head', 'options', 'trace' ]
            const methodWhenCreating = [ 'post' ]
            const methodWhenUpdating = [ 'put', 'patch' ]
            const methodWhenDeleting = [ 'delete' ]

            if ( methodWhenReading.includes( method ) ) {

                isAuthorizedToAccess = this.restrictions.canRead.includes( this.focus ) || this.restrictions.canRead.includes( this.any )

            } else if ( methodWhenCreating.includes( method ) ) {

                isAuthorizedToAccess = this.restrictions.canCreate.includes( this.focus ) || this.restrictions.canCreate.includes( this.any )

            } else if ( methodWhenUpdating.includes( method ) ) {

                isAuthorizedToAccess = this.restrictions.canUpdate.includes( this.focus ) || this.restrictions.canUpdate.includes( this.any )

            } else if ( methodWhenDeleting.includes( method ) ) {

                isAuthorizedToAccess = this.restrictions.canDelete.includes( this.focus ) || this.restrictions.canDelete.includes( this.any )

            }

        }

        return isAuthorizedToAccess
    }

    /**
     * get - role focused
     *
     * @returns {string|number}
     */
    get focus() {
        return this._focus
    }

    /**
     * get - restrictions
     *
     * @returns {Object}
     */
    get restrictions() {
        return this._restrictions
    }

    /**
     * set - restrictions
     *
     * @param  {Object} restrictions
     * @returns {Access}
     */
    set restrictions( restrictions ) {
        this._restrictions = restrictions
        return this
    }
}

module.exports = Access
