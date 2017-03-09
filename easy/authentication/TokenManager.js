/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const jwt = require( 'jsonwebtoken' )
const Configuration = require( '../core/Configuration' )

let config = null

/**
 * @class TokenManager
 */
class TokenManager {
	/**
	 * Sign new token
	 *
	 * @param {string} content
	 * @returns {string}
	 *
	 * @static
	 */
	static sign( content ) {
		return jwt.sign( content, TokenManager.config.secret, { expiresIn: TokenManager.config.duration })
	}

	/**
	 * Verify token validity
	 *
	 * @param {string} token
	 * @returns {Promise}
	 *
	 * @static
	 */
	static verify( token ) {
		return new Promise( ( resolve, reject ) => {
			jwt.verify( token, TokenManager.config.secret, ( error, decoded ) => {
				if ( error ) {
					resolve({ error })
				} else {
					resolve({ decoded })
				}
			})
		})
	}

	/**
	 * Get jwt configurations
	 *
	 * @returns {Object}
	 *
	 * @static
	 */
	static get config() {
		if ( null === config ) {
			config = Configuration.load( 'authentication' )
		}

		return config.jwt
	}
}

module.exports = TokenManager
