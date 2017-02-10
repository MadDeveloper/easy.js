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
     * exists - check if path is a document
     *
     * @returns {Promise}
     */
    exists() {}

    /**
     * exists - check, in synchronous maner, if path is a document
     *
     * @returns {boolean}
     */
    existsSync() {}

    /**
     * create - create the document at indicated path
     *
     * @param {number} options = {}
     *
     * @returns {Promise}
     */
    create( options = {}) {}

    /**
     * createSync - create, in synchronous maner, the document at indicated path
     *
     * @param {object} options = {}
     *
     * @returns {Object}
     */
    createSync( options = {}) {}

    /**
     * delete - Delete the document
     *
     * @returns {Promise}
     *
     * @memberOf Document
     */
    delete() {}

    /**
     * deleteSync - Delete the document synchronously
     *
     * @returns {Object}
     *
     * @memberOf Document
     */
    deleteSync() {}

    /**
     * rename - rename the document
     *
     * @param {string} newPath
     * @returns {Promise}
     *
     * @memberOf Document
     */
    rename( newPath ) {}

    /**
     * renameSync - renamed the document synchronously
     *
     * @param {string} newPath
     * @returns {Object}
     *
     * @memberOf Document
     */
    renameSync( newPath ) {}

    /**
     * move - move document at indicated path
     *
     * @param {Object} newPath
     * @returns {Promise}
     *
     * @memberOf Document
     */
    move( newPath ) {}

    /**
     * moveSync - move document at indicated path synchronously
     *
     * @param {Object} newPath
     * @returns {Object}
     *
     * @memberOf Document
     */
    moveSync( newPath ) {}
}

module.exports = Document
