/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/


/**
 * @class ConfigLoader
 */
class ConfigLoader {
    /**
     * constructor
     *
     * @param {Application} application
     */
    constructor( application ) {
        this.path = application.kernel.path
    }

	/**
	 * loadFromGlobal - load file from global configurations directory
	 *
	 * @param  {string} file
	 * @returns {Object}
	 */
	static loadFromGlobal( file ) {
		return require( `src/config/${file}` )
        // return require( `${this.path.config}/${file}` )
	}
}

module.exports = ConfigLoader
