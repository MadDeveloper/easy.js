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
 * Some classes in easy vendor use these functions.
 * /!\ Never add a polyfill on Object prototype (can cause problems with ORM or librairies which are based on objects).
 */

/**
 * @class Polyfills
 */
class Polyfills {
    /**
     * Load all polyfills
     */
    static load() {
        Polyfills.stringPolyfills()
    }

    /**
     * Load polyfills for String prototype
     */
    static stringPolyfills() {
		/*
		 * isEmpty
		 */
        if ( !String.prototype.isEmpty ) {
            String.prototype.isEmpty = function() {
                return 0 === this.valueOf().length
            }
        }

		/*
		 * isNumber
		 */
        if ( !String.prototype.isNumber ) {
            String.prototype.isNumber = function() {
                return !isNaN( this.valueOf() )
            }
        }
    }
}

module.exports = Polyfills
