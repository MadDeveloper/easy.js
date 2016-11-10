module.exports = class ConfigLoader {
	/**
	 * loadFromGlobal - load file from global configurations directory
	 *
	 * @param  {string} file
	 * @returns {Object}
	 */
	static loadFromGlobal( file ) {
		return require( `${__dirname}/../../../config/${file}.js` )
	}
}
