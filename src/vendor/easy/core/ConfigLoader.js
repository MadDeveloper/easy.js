import path from 'path'

export default class ConfigLoader {
	/**
	 * loadFromGlobal - description
	 *
	 * @param  {type} file description
	 * @returns {type}      description
	 */
	static loadFromGlobal( file ) {
		return require( `./../../../config/${file}.js` ).default
	}

	/**
	 * loadFromBundle - description
	 *
	 * @param  {type} bundle description
	 * @param  {type} file   description
	 * @returns {type}        description
	 */
	static loadFromBundle( bundle, file ) {

	}
}
