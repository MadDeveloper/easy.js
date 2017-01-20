/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * @class Document
 */
class Document {
    /**
     * exists - check if path is a directory
     *
     * @returns {Promise}
     */
    exists() {}

    /**
     * create - create directory at indicated path
     *
     * @param {object} options
     *
     * @returns {Promise}
     */
    create( options ) {}

    /**
     * delete - delete directory
     */
    delete() {}

    /**
     * rename - rename repository
     */
    rename() {}

    /**
     * move - move repository
     */
    move() {}
}

module.exports = Document
