/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const TokenManager = require( './TokenManager' )

/**
 * @class Authorization
 */
class Authorization {
	/**
	 * Check if user is logged with his token
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {boolean}
	 *
	 * @throws {Error} if token validation failed
	 */
	async checkToken( request, response ) {
		const token	= request.getBodyParameter( 'token' ) || request.getRouteParameter( 'token' ) || request.getHeader( 'x-access-token' )

		if ( token ) {
			try {
				const tokenValidation = await TokenManager.verify( token )

				if ( tokenValidation.error ) {
					return false
				}

				request
					.store( 'token', token )
					.store( 'user', tokenValidation.decoded )

				return true
			} catch ( error ) {
				throw new Error( `Check token has failed.\n${error}` )
			}
		} else {
			return false
		}
	}
}

module.exports = Authorization
