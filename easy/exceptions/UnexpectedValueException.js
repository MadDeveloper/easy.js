/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const Exception = require( './Exception' )

/**
 * @class UnexpectedValueException
 * @extends {Exception}
 */
class UnexpectedValueException extends Exception {
    /**
     * Creates an instance of UnexpectedValueException.
     * @param {string} [message=''] 
     * 
     * @memberOf UnexpectedValueException
     */
    constructor( message = '' ) {
        super( 'UnexpectedValueException', message )
    }
}

module.exports = UnexpectedValueException