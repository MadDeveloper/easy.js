/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const jwt = require( 'jsonwebtoken' )
const ConfigLoader = require( '../core/ConfigLoader' )

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
			jwt.verify( token, config.secret, ( error, decoded ) => error ? reject( error ) : resolve( decoded ) )
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
