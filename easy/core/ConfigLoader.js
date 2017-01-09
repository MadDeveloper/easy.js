/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

class ConfigLoader {
	/**
	 * loadFromGlobal - load file from global configurations directory
	 *
	 * @param  {string} file
	 * @returns {Object}
	 */
	static loadFromGlobal( file ) {
		return require( `${__dirname}/../../../src/config/${file}` )
	}
}

module.exports = ConfigLoader
