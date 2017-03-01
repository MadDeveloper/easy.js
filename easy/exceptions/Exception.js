/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * @class Exception
 */
class Exception {
    /**
     * Creates an instance of Exception.
     * 
     * @param {string} [type='Exception'] 
     * @param {string} [message=''] 
     * 
     * @memberOf Exception
     */
    constructor( type = 'Exception', message = '' ) {
        this._type = type
        this._message = message
        this._stack = new Error().stack
    }

    /**
     * Returns exception in string format
     * 
     * @returns {string}
     * 
     * @memberOf Exception
     */
    toString() {
        return `${this.type}: ${this.message}\n${this.stack.replace( /Error\n/gi, '' )}`
    }

    /**
     * Get exception type
     * 
     * @readonly
     * 
     * @memberOf Exception
     */
    get type() {
        return this._type
    }

    /**
     * Get exception message
     * 
     * @readonly
     * 
     * @memberOf Exception
     */
    get message() {
        return this._message
    }

    /**
     * Set exception message
     * 
     * @memberOf Exception
     */
    set message( value ) {
        if ( "string" === typeof value ) {
            this._message = value
        }
    }

    /**
     * Get the exception stack
     * 
     * @readonly
     * 
     * @memberOf Exception
     */
    get stack() {
        return this._stack
    }
}

module.exports = Exception