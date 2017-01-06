const { Repository } = require( 'easy/database' )

/**
 * @class UserRepository
 * @extends Repository
 */
class UserRepository extends Repository {
    /**
     * findAll - fetch all users from role
     *
     * @param  {Role} role
     * @returns {Promise}
     */
    findAll( role ) {
        return this
            .model
            .forge()
            .where({ role_id: role.get( 'id' ) })
            .fetchAll()
    }

    /**
     * find - fetch user by id or email
     *
     * @param  {Object} byParam
     * @param  {Object} options = {}
     * @returns {Promise}
     */
    find( byParam, options = {}) {
        const forgeParam = ( "number" === typeof byParam || ( 'string' === typeof byParam && byParam.isNumber() ) ) ? { id: byParam } : ( ( undefined !== byParam.id ) ? { id: byParam.id } : { email: byParam.email })

        return this
            .model
            .forge( forgeParam )
            .fetch( options )
    }
}

module.exports = UserRepository
