const { Entity } = require( 'easy/database' )

/**
 * @class Role
 */
class Role extends Entity {
    /**
     * Creates an instance of Role.
     * @param {EntityManager} em
     *
     * @memberOf Role
     */
    constructor( em ) {
        super( em )

        return this.database.Model.extend({
            tableName: 'roles',

            users() {
                return this.hasMany( em.model( 'user/entity/user' ) )
            }
        })
    }
}

module.exports = Role
