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
