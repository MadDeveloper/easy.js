/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/**
 * @class SecurityAccess
 *
 * Act as en interface
 */
class SecurityAccess {
    /**
     * authorized - check if user is authorized to access to the route requested
     *
     * @param  {Object} { configurations
     * @param  {Request} request
     * @param  {Response} response
     * @param  {Container} container }
     * @returns {Promise}
     */
    authorized({ configurations, request, response, container }) {}
}

module.exports = SecurityAccess
