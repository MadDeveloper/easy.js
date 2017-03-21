/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/*
 * Not recommended to change this file if you do not know the consequences.
 * Some classes of easy use these polyfills.
 */

/*
 * String
 */
if ( !String.prototype.isEmpty ) {
	String.prototype.isEmpty = function() {
		return 0 === this.valueOf().length
	}
}


if ( !String.prototype.isNumber ) {
	String.prototype.isNumber = function() {
		return !isNaN( this.valueOf() )
	}
}
