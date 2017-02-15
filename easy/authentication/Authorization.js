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
	 * checkToken - check if user is logged with his token
	 *
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @returns {boolean}
	 */
	async checkToken( request, response ) {
		const token	= request.getBodyParameter( 'token' ) || request.getRouteParameter( 'token' ) || request.getHeader( 'x-access-token' )

		if ( token ) {
			const decoded = await TokenManager.verify( token )

			if ( !decoded ) {
				return false
			}

			request.setAppParameter( 'token', token )
			request.setAppParameter( 'user', decoded )

			return true
		} else {
			return false
		}
	}
}

module.exports = Authorization
