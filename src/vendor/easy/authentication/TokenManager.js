import jwt 			from 'jsonwebtoken'
import ConfigLoader	from './../core/ConfigLoader'

/**
 * @class TokenManager
 */
export default class TokenManager {
	constructor() {
		this._token 	= undefined
		this._config	= config.jwt
	}

	/**
	 * sign - sign new token
	 *
	 * @param  {any} content
	 * @returns {string}
	 */
	sign( content ) {
		const config = ConfigLoader.loadFromGlobal( 'config' )

		this.token = jwt.sign( content, this.config.secret, { expiresIn: this.config.duration } )

		return this.token
	}

	/**
	 * verify - verify token validity
	 *
	 * @param  {string} token
	 * @returns {Promise}
	 */
	verify( token ) {
		return new Promise( ( resolve, reject ) =>
			jwt.verify( token, this.config.secret, ( error, decoded ) =>
				!error ? resolve( decoded ) : reject( error )))
	}

	/**
	 * get - current token
	 *
	 * @returns {string|undefined}
	 */
	get token() {
		return this._token
	}

	/**
	 * set - new token
	 *
	 * @param  {string} token
	 * @returns {TokenManager}
	 */
	set token( token ) {
		this._token = token

		return this
	}

	/**
	 * get - jwt config
	 *
	 * @returns {Object}
	 */
	get config() {
		return this._config
	}
}
