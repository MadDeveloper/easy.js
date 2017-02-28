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
	 * load - load file from global configurations directory
	 *
	 * @param {string} file
	 * @returns {any}
	 */
	static load( file ) {
		return require( require.resolve( `${Configuration.appPath}/src/config/${file}` ) )
	}

	/**
	 * Load configuration file from bundle
	 *
	 * @param {string} file
	 * @param {string} bundle
	 * @returns {any}
	 */
	static loadFromBundle( file, bundle ) {
		return require( require.resolve( `${Configuration.appPath}/src/bundles/${bundle}/config/${file}` ) )
	}

	/**
	 * Set root app path
	 *
	 * @static
	 *
	 * @memberOf Configuration
	 */
	static set appPath( newAppPath ) {
		appPath = path.resolve( newAppPath )
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
