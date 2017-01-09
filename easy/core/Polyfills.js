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
     * load - load all polyfills
     */
    static load() {
        Polyfills.stringPolyfills()
    }

    /**
     * stringPolyfills - polyfills for String prototype
     */
    static stringPolyfills() {
        if ( !String.prototype.isEmpty ) {
            String.prototype.isEmpty = function() {
                return this.valueOf().length === 0
            }
        }

        if ( !String.prototype.isNumber ) {
            String.prototype.isNumber = function() {
                return !isNaN( this.valueOf() )
            }
        }

        if ( !String.prototype.capitalizeFirstLetter ) {
            String.prototype.capitalizeFirstLetter = function() {
                return this.charAt( 0 ).toUpperCase() + this.slice( 1 )
            }
        }

        if ( !String.prototype.decapitalizeFirstLetter ) {
            String.prototype.decapitalizeFirstLetter = function() {
                return this.charAt( 0 ).toLowerCase() + this.slice( 1 )
            }
        }
    }
}

module.exports = Polyfills
