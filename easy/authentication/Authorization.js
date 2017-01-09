/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const TokenManager = require( './TokenManager' )

class Authorization {
	/**
	 * checkToken - check if user is logged with his token
	 *
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @returns {Promise}
	 */
	checkToken( request, response ) {
		const token	= request.getBodyParameter( 'token' ) || request.getRouteParameter( 'token' ) || request.getHeader( 'x-access-token' )

		if ( token ) {
			return TokenManager
				.verify( token )
				.then( decoded => {
					request.setAppParameter( 'token', token )
					request.setAppParameter( 'user', decoded )
				})
		} else {
			return Promise.reject()
		}
	}
}

module.exports = Authorization
