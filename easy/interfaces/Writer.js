/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * @class Writer
 */
class Writer {
    /**
     * Write the message on specific support
     *
     * @param {string} file
     * @param {string} [message='']
     * @param {Object} [context={}]
     * @returns {Promise}
     */
    async write( file, message = '', context = {}) {}
}

module.exports = Writer
