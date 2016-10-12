import Entity from '~/vendor/easy/database/Entity'

/**
 * @class Role
 * @extends Entity
 */
export default class Role extends Entity {
    /**
     * @constructor
     * @param  {object} dependencies
     */
    constructor( entityManager ) {
        super( entityManager )

        return this.orm.Model.extend({
            tableName: 'roles',

            users() {
                return this.hasMany( entityManager.getModel( 'user' ) )
            }
        })
    }
}
