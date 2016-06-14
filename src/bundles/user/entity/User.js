import Entity from '~/vendor/easy/database/Entity'

/**
 * @class User
 */
export default class User extends Entity {
    /**
     * @constructor
     * @param  {object} dependencies
     */
    constructor( entityManager ) {
        super( entityManager )

        return this.database.Model.extend({
            tableName: 'users',

            role() {
                return this.belongsTo( entityManager.getModel( 'role' ) )
            }
        })
    }
}
