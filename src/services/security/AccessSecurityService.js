import { indexOf }  from 'lodash'
import { roles }    from './../../config/roles'

/**
 * @class AccessSecurityService
 */
export default class AccessSecurityService {
    constructor() {
        this.loadRoles()
    }

    loadRoles() {
        for ( let role in roles ) {
            this[ `${role}` ] = roles[ role ]
        }

        this._restrictions  = {}
    }

    /**
     * focusOn - specify the role to focus on
     *
     * @param  {string|number} role
     * @returns {AccessSecurityService}
     */
    focusOn( role ) {
        this.focus = role

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
     * @returns {AccessSecurityService}
     */
    restrict({ mustBe = [], canCreate = [], canRead = [], canUpdate = [], canDelete = [] }) {
        if ( !mustBe || mustBe.length === 0 ) {
            mustBe = [ this.any ]
        }

        if ( !canCreate || canCreate.length === 0 ) {
            canCreate = mustBe
        }

        if ( !canRead || canRead.length === 0 ) {
            canRead = mustBe
        }

        if ( !canUpdate || canUpdate.length === 0 ) {
            canUpdate = mustBe
        }

        if ( !canDelete || canDelete.length === 0 ) {
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
     * canReach - Determine if current user can reach what he requested
     *
     * @param  {string} httpMethod HTTP method used
     * @returns {boolean}
     */
    canReach( httpMethod ) {
        let isAuthorizedToReach = false

        const method      = httpMethod.toLowerCase()
        const authorized  = indexOf( this.restrictions.mustBe, this.focus ) !== -1 || indexOf( this.restrictions.mustBe, this.any ) !== -1

        if ( authorized ) {

            const methodWhenReading   = [ 'get' ]
            const methodWhenCreating  = [ 'post' ]
            const methodWhenUpdating  = [ 'put', 'patch' ]
            const methodWhenDeleting  = [ 'delete' ]

            if ( indexOf( methodWhenReading, method ) !== -1 ) {

                isAuthorizedToReach = indexOf( this.restrictions.canRead, this.focus ) !== -1 || indexOf( this.restrictions.canRead, this.any ) !== -1

            } else if ( indexOf( methodWhenCreating, method ) !== -1 ) {

                isAuthorizedToReach = indexOf( this.restrictions.canCreate, this.focus ) !== -1 || indexOf( this.restrictions.canCreate, this.any ) !== -1

            } else if ( indexOf( methodWhenUpdating, method ) !== -1 ) {

                isAuthorizedToReach = indexOf( this.restrictions.canUpdate, this.focus ) !== -1 || indexOf( this.restrictions.canUpdate, this.any ) !== -1

            } else if ( indexOf( methodWhenDeleting, method ) !== -1 ) {

                isAuthorizedToReach = indexOf( this.restrictions.canDelete, this.focus ) !== -1 || indexOf( this.restrictions.canDelete, this.any ) !== -1

            }

        }

        return isAuthorizedToReach
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
     * @returns {AccessSecurityService}
     */
    set restrictions( restrictions ) {
        this._restrictions = restrictions
        return this
    }
}
