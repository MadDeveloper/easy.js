/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const path = require( 'path' )

let appPath = ''

/**
 * @class Configuration
 */
class Configuration {

	/**
	 * Load file from global configurations directory
	 *
	 * @param {string} file
	 * @returns {any}
	 *
	 * @throws {Error} if file path is invalid
	 */
	static load( file ) {
		const configurationFilePath = `${Configuration.appPath}/src/config/${file}`

		try {
			return require( require.resolve( configurationFilePath ) )
		} catch ( error ) {
			throw new ReferenceError( `Impossible to require global configuration file (${configurationFilePath}).\n${error}` )
		}
	}

	/**
	 * Load configuration file from bundle
	 *
	 * @param {string} file
	 * @param {string} bundle
	 * @returns {any}
	 *
	 * @throws {Error} if file path is invalid
	 */
	static loadFromBundle( file, bundle ) {
		const configurationFilePath = `${Configuration.appPath}/src/bundles/${bundle}/config/${file}`

		try {
			return require( require.resolve( configurationFilePath ) )
		} catch ( error ) {
			throw new Error( `Impossible to require bundle configuration file (${configurationFilePath}).\n${error}` )
		}
	}

	/**
	 * Set root app path
	 *
	 * @static
	 *
	 * @memberOf Configuration
	 */
	static set appPath( newAppPath ) {
		if ( 'string' === typeof newAppPath ) {
			appPath = path.resolve( newAppPath )
		}
	}

	/**
	 * Get root app path
	 *
	 * @static
	 *
	 * @returns {string}
	 *
	 * @memberOf Configuration
	 */
	static get appPath() {
		return appPath
	}
}

module.exports = Configuration
