import { indexOf }  from 'lodash'
import Service      from './../../vendor/easy/core/Service'

/*
 * You can edit as you want following roles.
 * Becareful: You must start your roles' id at 3
 * Roles' id are mapped with ids into database
 */


/**
 * @class AccessSecurityService
 */
export default class AccessSecurityService extends Service {
    constructor( container ) {
        super( container )
        /*
         * BECAREFUL WHEN EDITING OR DELETING THE FOLLOWING VARIABLES
         */
        this._any           = 0
        this._admin         = 1
        this._user          = 2
        this._focus         = this._any
        this._restrictions  = {}
    }

    load() {}

    /**
     * isAdmin - Check if current role focused is admin
     *
     * @returns {bool}
     */
    isAdmin() {
        return this.focus === this.admin
    }

    isUser() {
        return this.focus === this.user
    }

    isAny() {
        return this.focus === this.any
    }

    focusOn( role ) {
        this.focus = role
        return this
    }

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

        /*
         * An admin as all privileges
         */
        if ( indexOf( mustBe, this.admin ) === -1 ) {
            mustBe.push( this.admin )
        }

        if ( indexOf( canRead, this.admin ) === -1 ) {
            canRead.push( this.admin )
        }

        if ( indexOf( canCreate, this.admin ) === -1 ) {
            canCreate.push( this.admin )
        }

        if ( indexOf( canUpdate, this.admin ) === -1 ) {
            canUpdate.push( this.admin )
        }

        if ( indexOf( canDelete, this.admin ) === -1 ) {
            canDelete.push( this.admin )
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
     * @returns {bool}
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

    /*
     * Getters and setters
     */
    get any() {
        return this._any
    }

    set any( any ) {
        this._any = any
        return this
    }

    get admin() {
        return this._admin
    }

    get user() {
        return this._user
    }

    get focus() {
        return this._focus
    }

    get restrictions() {
        return this._restrictions
    }

    set restrictions( restrictions ) {
        this._restrictions = restrictions
        return this
    }
}
