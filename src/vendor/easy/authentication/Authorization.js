import TokenManager	from './TokenManager'
import Controller   from './../core/Controller'

export default class Authorization {
	/**
	 * authorized - check if user is logged with his token
	 *
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @param  {Function} next
	 */
	authorized( req, res, next ) {
		const controller	= Controller.buildAnonymous( req, res )
		const request		= controller.request
		const response		= controller.response
		const token			= request.getAppParameter( 'token' ) || request.getRouteParameter( 'token' ) || request.getHeader( 'x-access-token' )

		if ( token ) {
			TokenManager
				.verify( token )
				.then( decoded => {
					request.setAppParameter( 'token', token )
					request.setAppParameter( 'user', decoded )
					next()
				})
				.catch( () => response.unauthorized() )
		} else {
			response.unauthorized()
		}
	}
}
