import jwt 			from 'jsonwebtoken'
import ConfigLoader	from './../core/ConfigLoader'

/**
 * @class TokenManager
 */
export default class TokenManager {
	/**
	 * sign - sign new token
	 *
	 * @param  {any} content
	 * @returns {string}
	 */
	static sign( content ) {
		const config = TokenManager.getConfig()

		return jwt.sign( content, config.jwt.secret, { expiresIn: config.jwt.duration } )
	}

	/**
	 * verify - verify token validity
	 *
	 * @param  {string} token
	 * @returns {Promise}
	 */
	static verify( token ) {
		const config = TokenManager.getConfig()

		return new Promise( ( resolve, reject ) =>
			jwt.verify( token, config.jwt.secret, ( error, decoded ) =>
				!error ? resolve( decoded ) : reject( error )))
	}

	/**
	 * getConfig - get token (jwt) config
	 *
	 * @returns {Object}
	 */
	static getConfig() {
		return ConfigLoader.loadFromGlobal( 'config' )
	}
}
