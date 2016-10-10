import passportLocal	from 'passport-local'
import ConfigLoader		from './../core/ConfigLoader'
import Controller   	from './../core/Controller'
import TokenManager		from './TokenManager'

const LocalStrategy = passportLocal.Strategy

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
		this._router.post(
			this.config.route,
			this._passport.authenticate( 'local', { session: false }),
			( req, res ) => {
				const controller = this.buildController( req, res )
				controller.response.ok({
					user: req.user.user,
					token: req.user.token
				})
		})

		this._passport.use( new LocalStrategy({
			usernameField: this.config.usernameField,
			passwordField: this.config.passwordField
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
