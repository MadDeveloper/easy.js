import TokenManager	from './TokenManager'
import Controller   from './../core/Controller'

export default class Authorization {
	/**
	 * checkToken - check if user is logged with his token
	 *
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @returns {Promise}
	 */
	checkToken( request, response ) {
		const token	= request.getAppParameter( 'token' ) || request.getRouteParameter( 'token' ) || request.getHeader( 'x-access-token' )

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
