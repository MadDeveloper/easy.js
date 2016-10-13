import Entity from '~/vendor/easy/database/Entity'

/**
 * @class User
 * @extends Entity
 */
export default class User extends Entity {
    /**
     * @constructor
     * @param  {EntityManager} em
     */
    constructor( em ) {
        super( em )

        return em.orm.Model.extend({
            tableName: 'users',

            role() {
                return this.belongsTo( em.getModel( 'role' ) )
            }
        })
    }
}
