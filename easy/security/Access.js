/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Configuration = require( '../core/Configuration' )
const SecurityAccess = require( '../interfaces/SecurityAccess' )
const Authorization = require( '../authentication/Authorization' )

/**
 * @class Access
 * @extends SecurityAccess
 */
class Access extends SecurityAccess {
    /**
     * Creates an instance of Access.
     *
     * @constructor
     *
     * @memberOf Access
     */
    constructor() {
        super()

        this._roles = Configuration.load( 'roles' )
        this._authorization = new Authorization()
    }

    /**
     * Check if user is authorized to access to the route requested
     *
     * @param  {Object} { configurations
     * @param  {Request} request
     * @param  {Response} response }
     * @returns {boolean}
     */
    async authorized({ configurations, request, response }) {
        const tokenValidated = await this.authorization.checkToken( request, response )

        if ( !tokenValidated ) {
            response.unauthorized()

            return false
        }

        const rolesAuthorized = configurations.roles
        const focus = configurations.focus || 'role_id'
        const user = request.retrieve( 'user' )
        const roleUser = user[ focus ]
        const hasAccess = rolesAuthorized.includes( roleUser )

        if ( rolesAuthorized.includes( this.roles.any ) ) {
            return true
        }

        if ( !hasAccess ) {
            response.forbidden()

            return false
        }

        return true
    }

    /**
     * Authorization instance
     *
     * @readonly
     *
     * @memberOf Router
     */
    get authorization() {
        return this._authorization
    }

    /**
     * Get roles
     *
     * @readonly
     *
     * @memberOf Access
     */
    get roles() {
        return this._roles
    }
}

module.exports = Access
