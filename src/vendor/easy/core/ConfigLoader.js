export default class ConfigLoader {
	/**
	 * loadFromGlobal - load file from global configurations directory
	 *
	 * @param  {string} file
	 * @returns {Object}
	 */
	static loadFromGlobal( file ) {
		return require( `./../../../config/${file}.js` ).default
	}
}
