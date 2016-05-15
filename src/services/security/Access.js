import _ from 'lodash'

/*
 * You can edit as you want following roles.
 * Becareful: You must start your roles' id at 3
 * Roles' id are mapped with ids into database
 * example:
 *
 * var roleModerator = 3
 */
export default class Access {
    constructor() {
        /*
         * BECAREFUL WHEN EDITING OR DELETING THE FOLLOWING VARIABLES
         */
        this._any           = 0
        this._admin         = 1
        this._user          = 2
        this._focus         = this._any
        this._restrictions  = {}
    }

    isAdmin() {
        return focus === roleAdmin
    }

    isUser() {
        return focus === roleUser
    }

    isAny() {
        return focus === roleAny
    }

    focusOn( role ) {
        this.focus = role
        return this
    }

    restrict( params ) {
        if ( !params.mustBe || params.mustBe.length === 0 ) {
            params.mustBe = [ this.any ]
        }

        if ( !params.canRead || params.canRead.length === 0 ) {
            params.canRead = params.mustBe
        }

        if ( !params.canCreate || params.canCreate.length === 0 ) {
            params.canCreate = params.mustBe
        }

        if ( !params.canUpdate || params.canUpdate.length === 0 ) {
            params.canUpdate = params.mustBe
        }

        if ( !params.canDelete || params.canDelete.length === 0 ) {
            params.canDelete = params.mustBe
        }

        /*
         * An admin as all privileges
         */
        if ( _.indexOf( params.mustBe, this.admin ) === -1 ) {
            params.mustBe.push( this.admin )
        }

        if ( _.indexOf( params.canRead, this.admin ) === -1 ) {
            params.canRead.push( this.admin )
        }

        if ( _.indexOf( params.canCreate, this.admin ) === -1 ) {
            params.canCreate.push( this.admin )
        }

        if ( _.indexOf( params.canUpdate, this.admin ) === -1 ) {
            params.canUpdate.push( this.admin )
        }

        if ( _.indexOf( params.canDelete, this.admin ) === -1 ) {
            params.canDelete.push( this.admin )
        }

        this.restrictions = params

        return this
    }

    canReach( httpMethod ) {
        let isAuthorizedToReach = false

        const method      = httpMethod.toLowerCase()
        const authorized  = _.indexOf( this.restrictions.mustBe, this.focus ) !== -1 || _.indexOf( this.restrictions.mustBe, this.any ) !== -1

        if ( authorized ) {

            const methodWhenReading   = [ 'get' ]
            const methodWhenCreating  = [ 'post' ]
            const methodWhenUpdating  = [ 'put', 'patch' ]
            const methodWhenDeleting  = [ 'delete' ]

            if ( _.indexOf( methodWhenReading, method ) !== -1 ) {

                isAuthorizedToReach = _.indexOf( this.restrictions.canRead, focus ) !== -1 || _.indexOf( this.restrictions.canRead, this.any ) !== -1

            } else if ( _.indexOf( methodWhenCreating, method ) !== -1 ) {

                isAuthorizedToReach = _.indexOf( this.restrictions.canCreate, focus ) !== -1 || _.indexOf( this.restrictions.canCreate, this.any ) !== -1

            } else if ( _.indexOf( methodWhenUpdating, method ) !== -1 ) {

                isAuthorizedToReach = _.indexOf( this.restrictions.canUpdate, focus ) !== -1 || _.indexOf( this.restrictions.canUpdate, this.any ) !== -1

            } else if ( _.indexOf( methodWhenDeleting, method ) !== -1 ) {

                isAuthorizedToReach = _.indexOf( this.restrictions.canDelete, focus ) !== -1 || _.indexOf( this.restrictions.canDelete, this.any ) !== -1

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

    set admin( admin ) {
        this._admin = admin
        return this
    }

    get user() {
        return this._user
    }

    set user( user ) {
        this._user = user
        return this
    }

    get focus() {
        return this._focus
    }

    set focus( focus ) {
        this._focus = focus
        return this
    }

    get restrictions() {
        return this._restrictions
    }

    set restrictions( restrictions ) {
        this._restrictions = restrictions
        return this
    }
}
