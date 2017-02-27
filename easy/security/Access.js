/*
* This file is part of the easy framework.
*
* (c) Julien Sergent <sergent.julien@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const ConfigLoader = require( '../core/ConfigLoader' )
const SecurityAccess = require( '../interfaces/SecurityAccess' )
const roles = ConfigLoader.loadFromGlobal( 'roles' )

/**
 * @class Access
 * @extends SecurityAccess
 */
class Access extends SecurityAccess {
    /**
     * authorized - check if user is authorized to access to the route requested
     *
     * @param  {Object} { configurations
     * @param  {Request} request
     * @param  {Response} response
     * @param  {Container} container }
     * @returns {boolean}
     */
    async authorized({ configurations, request, response, container }) {
        let isAuthorizedToAccess = false
        let authorized = false
        let focus = configurations.focus || 'role_id'
        const method = request.getMethod().toLowerCase()
        const user = request.getAppParameter( 'user' )
        const rolesAuthorized = configurations.roles
        const focusUserProperty = user[ focus ]

        return isAuthorizedToAccess
    }
}

module.exports = Access
