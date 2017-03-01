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
 * @class InvalidArgumentException
 * @extends {Exception}
 */
class InvalidArgumentException extends Exception {
    /**
     * Creates an instance of InvalidArgumentException.
     * @param {string} [message=''] 
     * 
     * @memberOf InvalidArgumentException
     */
    constructor( message = '' ) {
        super( 'InvalidArgumentException', message )
    }
}

module.exports = InvalidArgumentException