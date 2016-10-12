import passportLocal	from 'passport-local'
import ConfigLoader		from './../core/ConfigLoader'
import Controller   	from './../core/Controller'
import Configurable		from './../interfaces/Configurable'
import Authorization    from './Authorization'
import TokenManager		from './TokenManager'

const LocalStrategy = passportLocal.Strategy

/**
 * @class Authentication
 * @extends Configurable
 */
export default class Authentication extends Configurable {
	/**
	 * constructor
	 *
	 * @param  {Container} router
	 * @param  {Passport} passport
	 */
	constructor( container, passport ) {
		super()

		this._config 			= ConfigLoader.loadFromGlobal( 'authentication' )
		this._container			= container
		this._passport			= passport
		this._router			= container.getComponent( 'router' )
		this._authorization		= new Authorization()
	}

	/**
	 * configure - init auth strategies
	 */
	configure() {
		if ( this.useCustom() ) {
			const customProvider = this._container.getService( this.config.service )
			customProvider.configure()
		} else {
			/*
			 * Default authentication process
			 */
			this._userRepository = this._container.getComponent( 'entityManager' ).getRepository( this.config.repository )
			this.initLocalStrategy()

			/*
			 * Verify token
			 */
			this._router.scope.use( ( req, res, next ) => {
				const request   = this._router.getRequest( req )
				const response  = this._router.getResponse( res, request )

				this._authorization
					.checkToken( request, response )
					.then( next )
					.catch( () => response.unauthorized() )
			})
		}
	}

	/**
	 * initLocalStrategy - init local strategy
	 */
	initLocalStrategy() {
		this._router.scope.post(
			this.config.route,
			this._passport.authenticate( 'local', { session: false }),
			( req, res ) => {
				const request   = this._router.getRequest( req )
	            const response  = this._router.getResponse( res, request )

				response.ok({
					user: request.getProperty( 'user' ).user,
					token: request.getProperty( 'user' ).token
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
	 * useCustom - description
	 *
	 * @returns {boolean}
	 */
	useCustom() {
		return this.config.custom && this.config.service
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
