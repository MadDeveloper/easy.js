import passportLocal	from 'passport-local'
import passportGithub	from 'passport-github2'
import passportOAuth2	from 'passport-oauth'
import passportFacebook	from 'passport-facebook'
import passportTwitter	from 'passport-twitter'
import passportGoogle	from 'passport-google-oauth'
import ConfigLoader		from './../core/ConfigLoader'
import Controller   	from './../core/Controller'
import TokenManager		from './TokenManager'

const LocalStrategy 	= passportLocal.Strategy
const GithubStrategy 	= passportGithub.Strategy
const OAuth2Strategy 	= passportOAuth2.OAuth2Strategy
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
	constructor( router ) {
		this._config 			= ConfigLoader.loadFromGlobal( 'authentication' )
		this._container 		= global.easy.container
		this._passport			= global.easy.passport
		this._entityManager		= this._container.getComponent( 'EntityManager' )
		this._userRepository	= this._entityManager.getRepository( this.config.repository )
		this._user				= this._entityManager.getModel( this.config.model )
		this._router			= router
	}

	/**
	 * init - init auth strategies
	 */
	init() {
		if ( this.config.strategies.local ) {
			this.initLocalStrategy()
		}

		if ( this.config.strategies.facebook ) {
			this.initFacebookStrategy()
		}

		if ( this.config.strategies.google ) {
			this.initGoogleStrategy()
		}

		if ( this.config.strategies.twitter ) {
			this.initTwitterStrategy()
		}

		if ( this.config.strategies.github ) {
			this.initGithubStrategy()
		}

		if ( this.config.strategies.oauth2 ) {
			this.initOAuth2Strategy()
		}
	}

	/**
	 * login - login user and provide new token
	 *
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @param  {Function} next
	 */
	login( req, res, next ) {
		const controller		= this.buildController( req, res )
		const request			= controller.request
		const userRepository 	= controller.entityManager.getRepository( 'user' )
		const token = {}

		next()
	}

	/**
	 * isLogged - check if user is logged with his token
	 *
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @param  {Function} next
	 */
	isLogged( req, res, next ) {
		const controller	= this.buildController( req, res )
		const request		= controller.request
		const response		= controller.response
		const token			= request.getBodyParameter( 'token' ) || request.getRouteParameter( 'token' ) || request.scope.headers[ 'x-access-token' ]

		if ( token ) {
			return
				TokenManager
					.verify( token )
					.then( decoded => {
						request.setBodyParameter( 'token', decoded )
						next()
					})
					.catch( error => response.unauthorized() )
		} else {
			response.unauthorized()
		}
	}

	/**
	 * initLocalStrategy - init local strategy
	 */
	initLocalStrategy() {
		const localConfig = this.config.strategies.local

		this._router.post(
			localConfig.route,
			this._passport.authenticate( 'local', { session: false }),
			( req, res ) => {
				const controller = this.buildController( req, res )
				controller.response.ok({
					user: req.user.user,
					token: req.user.token
				})
		})

		this._passport.use( new LocalStrategy({
			usernameField: localConfig.usernameField,
			passwordField: localConfig.passwordField
		}, ( username, password, done ) => {
			let findBy = {}
			findBy[ localConfig.usernameField ] = username

			this._userRepository
				.find( findBy )
				.then( user => {
					if ( user && password === user.get( localConfig.passwordField ) ) {
						return done( null, { user, token: TokenManager.sign( user ) } )
					} else {
						return done( null, false )
					}
				})
				.catch( error => done( error ) )
		}))
	}

	/**
	 * initFacebookStrategy - init facebook strategy
	 */
	initFacebookStrategy() {
		const facebookConfig = this.config.strategies.facebook

		this._router.get( facebookConfig.route, ( req, res, next ) => {
			passport.authenticate( 'facebook' )
		})

		passport.use( new FaceboookStrategy({
			clientID: facebookConfig.clientID,
			clientSecret: facebookConfig.clientSecret,
			callbackURL: facebookConfig.callbackURL
		}, ( accessToken, refreshToken, profile, done ) => {
			if ( this.config.register ) {

			} else {

				done( null, { accessToken, refreshToken, profile } )
			}
		}))
	}

	/**
	 * initGoogleStrategy - init google strategy
	 */
	initGoogleStrategy() {
		passport.use( new GoogleStrategy( this.config.strategies.google, ( token, tokenSecret, profile, done ) => {

		}))
	}

	/**
	 * initTwitterStrategy - init twitter strategy
	 */
	initTwitterStrategy() {
		passport.use( new TwitterStrategy( this.config.strategies.twitter, ( token, tokenSecret, profile, done ) => {

		}))
	}

	/**
	 * initGithubStrategy - init Github strategy
	 */
	initGithubStrategy() {
		passport.use( new GithubStrategy( this.config.strategies.github, ( token, tokenSecret, profile, done ) => {

		}))
	}

	/**
	 * initOAuth2Strategy - init OAuth2 strategy
	 */
	initOAuth2Strategy() {
		passport.use( 'provider', new OAuth2Strategy( this.config.strategies.oauth2, ( accessToken, refreshToken, profile, done ) => {

		}))
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
