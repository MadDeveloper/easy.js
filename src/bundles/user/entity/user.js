const { Entity } = require( 'easy/database' )

/**
 * @class User
 * @extends Entity
 */
class User extends Entity {
    /**
     * Creates an instance of User.
     * @param {EntityManager} em
     *
     * @memberOf User
     */
    constructor( em ) {
        super( em )

        return this.database.Model.extend({
            tableName: 'users',

            role() {
                return this.belongsTo( em.model( 'role/entity/role' ) )
            }
        })
    }
}

module.exports = User
