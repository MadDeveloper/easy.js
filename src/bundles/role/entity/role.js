const { Entity } = require( 'easy/database' )

/**
 * @class Role
 * @extends Entity
 */
class Role extends Entity {
    /**
     * build - build entity the first time
     *
     * @returns {Bookshelf.Model}
     */
    build() {
        return this.database.Model.extend({
            tableName: 'roles',

            users() {
                return this.hasMany( this.em.getModel( 'user/entity/user' ) )
            }
        })
    }
}

module.exports = Role
