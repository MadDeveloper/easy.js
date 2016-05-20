/*
 * Role model
 */
import Entity from './../../../vendor/easy/core/Entity'

export default class Role extends Entity {
    constructor( roleFactory ) {
        super( roleFactory )

        const self = this

        return this.database.Model.extend({
            tableName: 'roles',

            users() {
                return this.hasMany( self.bundleManager.getFactory( 'user' ).getModel() )
            }
        })
    }
}
