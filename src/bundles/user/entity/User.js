import Entity from './../../../vendor/easy/core/Entity'

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

        const Role = entityManager.getModel( 'role' )

        return this.database.Model.extend({
            tableName: 'users',

            role() {
                return this.belongsTo( Role )
            }
        })
    }
}
