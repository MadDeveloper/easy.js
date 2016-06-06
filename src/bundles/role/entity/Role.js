import Entity from './../../../vendor/easy/core/Entity'

/**
 * @class Role
 */
export default class Role extends Entity {
    /**
     * @constructor
     * @param  {object} dependencies
     */
    constructor( entityManager ) {
        super( entityManager )

        const User = entityManager.getModel( 'user' )

        return database.Model.extend({
            tableName: 'roles',

            users() {
                return this.hasMany( User )
            }
        })
    }
}
