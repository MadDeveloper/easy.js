const { Entity } = require( 'easy/database' )

/**
 * @class User
 * @extends Entity
 */
class User extends Entity {
    /**
     * build - build entity the first time
     *
     * @returns {Bookshelf.Model}
     */
    build() {
        return this.database.Model.extend({
            tableName: 'users',

            role() {
                return this.belongsTo( this.em.getModel( 'role/entity/role' ) )
            }
        })
    }
}

module.exports = User
