const jwt = require( 'jsonwebtoken' )
const ConfigLoader = require( 'easy/core/ConfigLoader' )

/**
 * @class TokenManager
 */
class TokenManager {
	/**
	 * sign - sign new token
	 *
	 * @param  {any} content
	 * @returns {string}
	 */
	static sign( content ) {
		const config = TokenManager.getConfig()

		return jwt.sign( content, config.secret, { expiresIn: config.duration })
	}

	/**
	 * verify - verify token validity
	 *
	 * @param  {string} token
	 * @returns {Promise}
	 */
	static verify( token ) {
		const config = TokenManager.getConfig()

		return new Promise( ( resolve, reject ) => {
			jwt.verify( token, config.secret, ( error, decoded ) => {
				!error ? resolve( decoded ) : reject( error )
			})
		})
	}

	/**
	 * getConfig - get token (jwt) config
	 *
	 * @returns {Object}
	 */
	static getConfig() {
		return ConfigLoader.loadFromGlobal( 'authentication' ).jwt
	}
}

module.exports = TokenManager
