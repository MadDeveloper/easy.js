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
 * @class RuntimeException
 * @extends {Exception}
 */
class RuntimeException extends Exception {
    /**
     * Creates an instance of RuntimeException.
     * @param {string} [message=''] 
     * 
     * @memberOf RuntimeException
     */
    constructor( message = '' ) {
        super( 'RuntimeException', message )
    }
}

module.exports = RuntimeException