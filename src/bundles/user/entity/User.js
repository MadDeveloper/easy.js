import Entity from '~/vendor/easy/database/Entity'

/**
 * @class User
 * @extends Entity
 */
export default class User extends Entity {
    /**
     * @constructor
     * @param  {object} dependencies
     */
    constructor( entityManager ) {
        super( entityManager )

        return this.orm.Model.extend({
            tableName: 'users',

            role() {
                return this.belongsTo( entityManager.getModel( 'role' ) )
            }
        })
    }
}
