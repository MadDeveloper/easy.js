import Entity from './../../../vendor/easy/database/Entity'

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

        return this.database.Model.extend({
            tableName: 'roles',

            users() {
                return this.hasMany( entityManager.getModel( 'user' ) )
            }
        })
    }
}
