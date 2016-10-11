import TokenManager	from './TokenManager'
import Controller   from './../core/Controller'

export default class Authorization {
	/**
	 * checkToken - check if user is logged with his token
	 *
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @param  {Function} next
	 */
	checkToken( req, res, next ) {
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

	/**
	 * authorized - authorize user only if he has access for route
	 *
	 * @param  {Controller} { controller
	 * @param  {Object} restrictions
	 * @param  {string} focus
	 * @param  {Function} next }
	 */
	authorized({ controller, restrictions, focus, next }) {
        const user = controller.request.getAppParameter( 'user' )
		const access = controller.container.getService( 'security.access' )

        access.restrict( restrictions )

        if ( access.focusOn( user[ focus ] ).canReach( controller.request.getMethod() ) ) {
            next()
        } else {
            controller.response.forbidden()
        }
	}
}
