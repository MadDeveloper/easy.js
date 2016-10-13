import Entity from '~/vendor/easy/database/Entity'

/**
 * @class Role
 * @extends Entity
 */
export default class Role extends Entity {
    /**
     * @constructor
     * @param  {EntityManager} em
     */
    constructor( em ) {
        super( em )

        return em.orm.Model.extend({
            tableName: 'roles',

            users() {
                return this.hasMany( em.getModel( 'user' ) )
            }
        })
    }
}
