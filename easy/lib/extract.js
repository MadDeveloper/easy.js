/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * Extract controller and action
 *
 * @param {string} controllerAction
 * @returns {String[]}
 */
function controllerAndAction( controllerAction ) {
	if ( !controllerAction.includes( '.' ) ) {
		return []
	}

	return controllerAction.split( '.' )
}

module.exports.controllerAndAction = controllerAndAction
