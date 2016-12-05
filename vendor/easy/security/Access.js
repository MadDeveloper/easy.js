const { indexOf }       = require( 'lodash' )
const roles             = require( 'src/config/roles' )
const SecurityAccess    = require( './../interfaces/SecurityAccess' )

/**
 * @class Access
 * @extends SecurityAccess
 */
class Access extends SecurityAccess {
    /**
     * constructor
     *
     * @param  {Container} container
     */
    constructor( container ) {
        super()

        this.loadRoles()
        this._restrictions = {}
        this.container = container
    }

    /**
     * getAccessHandler - returns access authority handler
     *
     * @param  {Object} configurations
     * @returns {Access|Service}
     */
    getAccessHandler( configurations ) {
        return 'default' === configurations.strategy ? this : this.container.getService( configurations.strategy )
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
     * authorized - check if user is authorized to access to the route requested
     *
     * @param  {Object} { configurations
     * @param  {Request} request
     * @param  {Response} response
     * @param  {Container} container }
     * @returns {Promise}
     */
    authorized({ configurations, request, response, container }) {
        let isAuthorizedToAccess    = false
        let authorized              = false
        const method                = request.getMethod().toLowerCase()
        const user                  = request.getAppParameter( 'user' )

        this.restrict( configurations.rules ).focusOn( user[ configurations.focus ] )

        authorized = indexOf( this.restrictions.mustBe, this.focus ) !== -1 || indexOf( this.restrictions.mustBe, this.any ) !== -1

        if ( authorized ) {

            const methodWhenReading   = [ 'get' ]
            const methodWhenCreating  = [ 'post' ]
            const methodWhenUpdating  = [ 'put', 'patch' ]
            const methodWhenDeleting  = [ 'delete' ]

            if ( indexOf( methodWhenReading, method ) !== -1 ) {

                isAuthorizedToAccess = indexOf( this.restrictions.canRead, this.focus ) !== -1 || indexOf( this.restrictions.canRead, this.any ) !== -1

            } else if ( indexOf( methodWhenCreating, method ) !== -1 ) {

                isAuthorizedToAccess = indexOf( this.restrictions.canCreate, this.focus ) !== -1 || indexOf( this.restrictions.canCreate, this.any ) !== -1

            } else if ( indexOf( methodWhenUpdating, method ) !== -1 ) {

                isAuthorizedToAccess = indexOf( this.restrictions.canUpdate, this.focus ) !== -1 || indexOf( this.restrictions.canUpdate, this.any ) !== -1

            } else if ( indexOf( methodWhenDeleting, method ) !== -1 ) {

                isAuthorizedToAccess = indexOf( this.restrictions.canDelete, this.focus ) !== -1 || indexOf( this.restrictions.canDelete, this.any ) !== -1

            }

        }

        return isAuthorizedToAccess ? Promise.resolve() : Promise.reject()
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
