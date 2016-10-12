import passportLocal	from 'passport-local'
import ConfigLoader		from './../core/ConfigLoader'
import Controller   	from './../core/Controller'
import Configurable		from './../interfaces/Configurable'
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
	 * @param  {type} router        description
	 * @param  {type} entityManager description
	 * @param  {type} passport      description
	 */
	constructor( router, entityManager, passport ) {
		super()

		this._config 			= ConfigLoader.loadFromGlobal( 'authentication' )
		this._passport			= passport
		this._userRepository	= entityManager.getRepository( this.config.repository )
		this._router			= router
	}

	/**
	 * configure - init auth strategies
	 */
	configure() {
		this.initLocalStrategy()
	}

	/**
	 * initLocalStrategy - init local strategy
	 */
	initLocalStrategy() {
		this._router.scope.post(
			this.config.route,
			this._passport.authenticate( 'local', { session: false }),
			( req, res ) => {
				const request   = this._router.buildRequest( req )
	            const response  = this._router.buildResponse( res, request )

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
	 * get - authentication config
	 *
	 * @returns {Object}
	 */
	get config() {
		return this._config
	}
}
