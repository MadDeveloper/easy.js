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
const Token = require( '../authentication/Token' )

/**
 * @class Access
 * @extends SecurityAccess
 */
class Access extends SecurityAccess {
    /**
     * Creates an instance of Access.
     *
     * @constructor
	 * @param {Object} roles
     *
     * @memberOf Access
     */
    constructor( roles ) {
        super()

        this._roles = roles || Configuration.load( 'roles' )
    }

	/**
	 * Check if user has access rights
	 *
	 * @param {any} role
	 * @returns {boolean}
	 *
	 * @memberOf Access
	 */
	isGranted( role ) {
		return this.roles.includes( roles )
	}

    /**
     * Check if user is authorized to access to the route requested
     *
     * @param {Object} { configurations
     * @param {Request} request
     * @param {Response} response }
     * @returns {boolean}
     */
    async authorized({ configurations, request, response }) {
		const tokenValidation = await this.checkToken( request )

        if ( !tokenValidation ) {
            response.unauthorized()

            return false
        }

        const rolesAuthorized = configurations.roles
        const focus = configurations.focus || 'role_id'
        const user = request.get( 'user' )
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
	 * Check if user is logged with his token
	 *
	 * @param {Object} req
	 * @returns {boolean}
	 *
	 * @throws {Error} if token validation failed
	 */
	async checkToken( request ) {
		const token	= request.getToken()

		if ( token ) {
			try {
				const tokenValidation = await Token.verify( token )

				if ( tokenValidation.error ) {
					return false
				}

				request
					.set( 'token', token )
					.set( 'user', tokenValidation.decoded )

				return true
			} catch ( error ) {
				throw new Error( `Check token has failed.\n${error}` )
			}
		} else {
			return false
		}
	}

    /**
     * Get roles
	 *
	 * @returns {Object}
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
