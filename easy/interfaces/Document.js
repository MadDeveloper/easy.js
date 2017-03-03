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
     * Check if path is a document
     *
     * @returns {Promise}
     */
    exists() {}

    /**
     * Check, in synchronous maner, if path is a document
     *
     * @returns {boolean}
     *
     * @throws {Error} if document path is invalid
     */
    existsSync() {}

    /**
     * Read the document
     *
     * @param {Object} [options = {encoding: 'utf8'}]
     * @returns {Promise}
     */
    read( options = { encoding: 'utf8' }) {}

    /**
     * Read the document synchronously
     *
     * @param {object} [options = {encoding: 'utf8'}]
     * @returns {any}
     *
     * @throws {Error} if directory path is invalid
     */
    readSync( options = { encoding: 'utf8' }) {}

    /**
     * Create the document at indicated path
     *
     * @param {number} [options={}]
     * @returns {Promise}
     */
    create( options = {}) {}

    /**
     * Create, in synchronous maner, the document at indicated path
     *
     * @param {object} options = {}
     * @returns {boolean}
     *
     * @throws {Error} if document path is invalid
     */
    createSync( options = {}) {}

    /**
     * Delete the document
     *
     * @returns {Promise}
     *
     * @memberOf Document
     */
    delete() {}

    /**
     * Delete the document synchronously
     *
     * @returns {boolean}
     *
     * @throws {Error} if document path is invalid
     *
     * @memberOf Document
     */
    deleteSync() {}

    /**
     * Rename the document
     *
     * @param {string} newPath
     * @returns {Promise}
     *
     * @memberOf Document
     */
    rename( newPath ) {}

    /**
     * Renamed the document synchronously
     *
     * @param {string} newPath
     * @returns {boolean}
     *
     * @throws {Error} if document path is invalid
     *
     * @memberOf Document
     */
    renameSync( newPath ) {}

    /**
     * Move document at indicated path
     *
     * @param {Object} newPath
     * @returns {Promise}
     *
     * @memberOf Document
     */
    move( newPath ) {}

    /**
     * Move document at indicated path synchronously
     *
     * @param {Object} newPath
     * @returns {boolean}
     *
     * @throws {Error} if document path is invalid
     *
     * @memberOf Document
     */
    moveSync( newPath ) {}
}

module.exports = Document
