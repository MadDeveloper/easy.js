const { Entity } = require( 'easy/database' )

/**
 * @class User
 * @extends Entity
 */
class User extends Entity {
    /**
     * @constructor
     * @param  {EntityManager} em
     */
    constructor( em ) {
        super( em )

        return em.orm.Model.extend({
            tableName: 'users',

            role() {
                return this.belongsTo( em.getModel( 'role/entity/role' ) )
            }
        })
    }
}

module.exports = User
