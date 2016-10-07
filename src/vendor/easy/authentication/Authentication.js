import passport 		from 'passport'
import passportLocal	from 'passport-local'
import passportOpenId	from 'passport-openid'
import passportOAuth	from 'passport-oauth'
import passportFacebook	from 'passport-facebook'
import passportTwitter	from 'passport-twitter'
import passportGoogle	from 'passport-google-oauth'
import ConfigLoader		from './../core/ConfigLoader'
import Controller   	from './../core/Controller'
import TokenManager		from './TokenManager'

const LocalStrategy 	= passportLocal.Strategy
const openIdStrategy 	= passportOpenId.Strategy
const OAuthStrategy 	= passportOAuth.OAuthStrategy
const FaceboookStrategy	= passportFacebook.Strategy
const TwitterStrategy 	= passportTwitter.Strategy
const GoogleStrategy 	= passportLocal.OAuthStrategy

/**
 * @class Authentication
 */
export default class Authentication {
	/**
	 * constructor
	 */
	constructor() {
		this._config = ConfigLoader.loadFromGlobal( 'authentication' )
	}

	/**
	 * login - login user and provide new token
	 *
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @returns {Promise}
	 */
	login( req, res ) {
		return new Promise( ( resolve, reject )=> {
			const tokenManager		= new TokenManager()
			const controller		= this.buildController( req, res )
			const request			= controller.request
			const userRepository 	= controller.entityManager.getRepository( 'user' )

			const token = tokenManager.sign({})

			resolve( token )
		})
	}

	/**
	 * isLogged - check if user is logged with his token
	 *
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @returns {Promise}     description
	 */
	isLogged( req, res ) {
		const tokenManager	= new TokenManager()
		const controller	= this.buildController( req, res )
		const request		= controller.request
		const response		= controller.response
		const token			= request.getBodyParameter( 'token' ) || request.getRouteParameter( 'token' ) || request.scope.headers[ 'x-access-token' ]

		if ( token ) {
			return tokenManager.verify( token ).then( decoded => request.setBodyParameter( 'token', decoded ) )
		} else {
			response.unauthorized()

			return Promise.reject()
		}
	}

	/**
	 * buildController - build controller to access
	 *
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @returns {Controller}
	 */
	buildController( req, res ) {
		return new Controller( req, res )
	}

	/**
	 * get - authentication config
	 *
	 * @returns {Object}
	 */
	get config() {
		return this._config
	}
}
