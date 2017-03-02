/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const passportLocal = require( 'passport-local' )
const Configuration = require( '../core/Configuration' )
const Controller = require( '../core/Controller' )
const Configurable = require( '../interfaces/Configurable' )
const TokenManager = require( './TokenManager' )
const LocalStrategy = passportLocal.Strategy

/**
 * @class Authentication
 * @extends Configurable
 */
class Authentication extends Configurable {
	/**
	 * constructor
	 *
	 * @param  {Container} router
	 * @param  {Passport} passport
	 */
	constructor( container, passport ) {
		super()

		this._config = Configuration.load( 'authentication' )
		this._container = container
		this._passport = passport
		this._router = container.get( 'component.router' )
	}

	/**
	 * configure - init auth strategies
	 */
	configure() {
		if ( this.useCustom() ) {
			/*
			 * Custom authentication process
			 */
			this.initCustomStrategy()
		} else {
			/*
			 * Default authentication process
			 */
			this.initLocalStrategy()
		}
	}


	 /**
	  * initCustomStrategy - init custom strategy
	  */
	initCustomStrategy() {
		const customProvider = this._container.get( this.config.service )

		this._router.scope.post( this.config.route, ( req, res ) => {
			const request = this._router.getRequest( req )
			const response = this._router.getResponse( res )

			customProvider.login( request, response )
		})
	}

	/**
	 * initLocalStrategy - init local strategy
	 */
	initLocalStrategy() {
		this.defineLoginRoute()
		this.defineLocalStrategy()
	}

	/**
	 * Define the default login route
	 *
	 * @memberOf Authentication
	 */
	defineLoginRoute() {
		this._router.scope.post( this.config.route, this._passport.authenticate( 'local', { session: false }), ( req, res ) => {
			const request = this._router.getRequest( req )
			const response = this._router.getResponse( res )

			response.ok({
				user: request.getProperty( 'user' ).user,
				token: request.getProperty( 'user' ).token
			})
		})
	}

	/**
	 * Define local strategy behaviour
	 *
	 * @memberOf Authentication
	 */
	defineLocalStrategy() {
		const em = this._container.get( 'component.entitymanager' )
		this._userRepository = em.getRepository( this.config.repository, { model: this.config.model })

		this._passport.use( new LocalStrategy({
			usernameField: this.config.usernameField,
			passwordField: this.config.passwordField
		}, async ( username, password, done ) => {
			let findBy = { [ this.config.usernameField ]: username }

			try {
				const user = await this._userRepository.find( findBy )

				if ( user && password === user.get( this.config.passwordField ) ) {
					user.unset( this.config.passwordField )

					return done( null, { user: user.attributes, token: TokenManager.sign( user.attributes ) })
				} else {
					return done( null, false )
				}
			} catch ( error ) {
				throw new Error( `Error when defining local authentication strategy.\n${error.message}` )
			}
		}) )
	}

	/**
	 * useCustom - check if we use custom authentication
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

module.exports = Authentication
