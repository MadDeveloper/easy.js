/*
 * Not recommended to change this file if you do not know the consequences.
 * Some classes in easy vendor use these functions.
 * /!\ Never add a polyfill on Object (can cause problems with ORM or librairies which are based on objects).
 */

import Component from './Component'

/**
 * @class Polyfills
 * @extends Component
 */
export default class Polyfills extends Component {
    /**
     * constructor
     */
    constructor() {
        super()

        this.stringPolyfills()
    }

    /**
     * stringPolyfills - polyfills for String prototype
     */
    stringPolyfills() {
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
