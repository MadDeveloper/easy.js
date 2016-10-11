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
	constructor( application, passport ) {
		this._config 			= ConfigLoader.loadFromGlobal( 'authentication' )
		this._container 		= application.container
		this._passport			= passport
		// this._entityManager		= this._container.getComponent( 'EntityManager' )
		// this._userRepository	= this._entityManager.getRepository( this.config.repository )
		// this._user				= this._entityManager.getModel( this.config.model )
		this._router			= application.expressRouter
	}

	/**
	 * init - init auth strategies
	 */
	init() {
		this.initLocalStrategy()
	}

	/**
	 * initLocalStrategy - init local strategy
	 */
	initLocalStrategy() {
		this._router.post(
			this.config.route,
			this._passport.authenticate( 'local', { session: false }),
			( req, res ) => {
				const controller = Controller.buildAnonymous( req, res )
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
			findBy[ this.config.usernameField ] = username

			this._userRepository
				.find( findBy )
				.then( user => {
					if ( user && password === user.get( this.config.passwordField ) ) {
						user.unset( this.config.passwordField )

						return done( null, { user: user.attributes, token: TokenManager.sign( user.attributes ) } )
					} else {
						return done( null, false )
					}
				})
				.catch( error => done( error ) )
		}))
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
