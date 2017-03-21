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
const Token = require( './Token' )
const Request = require( '../http/Request' )
const Response = require( '../http/Response' )
const LocalStrategy = passportLocal.Strategy

/**
 * @class Authentication
 */
class Authentication {
	/**
	 * @constructor
	 * @param {Container} router
	 * @param {Passport} passport
	 */
	constructor( container, passport ) {
		this._config = {}
		this._container = container
		this._passport = passport
		this._router = container.get( 'router' )
		this._config = Configuration.load( 'authentication' )
	}

	/**
	 * Activate auth strategy
	 */
	activate() {
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
	  * Init custom strategy
	  */
	initCustomStrategy() {
		const customProvider = this._container.get( this.config.service )

		this._router.scope.post( this.config.route, ( req, res ) => {
			const request = new Request( req )
			const response = new Response( res )

			customProvider.login( request, response )
		})
	}

	/**
	 * Init local strategy
	 */
	initLocalStrategy() {
		this._defineLoginRoute()
		this._defineLocalStrategy()
	}

	/**
	 * Define the default login route
	 *
	 * @private
	 *
	 * @memberOf Authentication
	 */
	_defineLoginRoute() {
		this._router.scope.post( this.config.route, this._passport.authenticate( 'local', { session: false }), ( req, res ) => {
			const request = new Request( req )
			const response = new Response( res )

			response.ok({
				user: request.getProperty( 'user' ).user,
				token: request.getProperty( 'user' ).token
			})
		})
	}

	/**
	 * Define local strategy behaviour
	 *
	 * @private
	 *
	 * @memberOf Authentication
	 */
	_defineLocalStrategy() {
		const em = this._container.get( 'entitymanager' )
		this._userRepository = em.repository( this.config.repository, { model: this.config.model })

		this._passport.use( new LocalStrategy({
			usernameField: this.config.usernameField,
			passwordField: this.config.passwordField
		}, async ( username, password, done ) => {
			let findBy = { [ this.config.usernameField ]: username }

			try {
				const user = await this._userRepository.find( findBy )

				if ( user && password === user.get( this.config.passwordField ) ) {
					user.unset( this.config.passwordField )

					return done( null, { user: user.attributes, token: Token.sign( user.attributes ) })
				} else {
					return done( null, false )
				}
			} catch ( error ) {
				done( error )
			}
		}) )
	}

	/**
	 * Check if user use custom authentication
	 *
	 * @returns {boolean}
	 */
	useCustom() {
		return this.config.custom && this.config.service
	}

	/**
	 * Get authentication configurations
	 *
	 * @returns {Object}
	 */
	get config() {
		return this._config
	}
}

module.exports = Authentication
