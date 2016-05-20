/*
 * User model
 */
import Entity from './../../../vendor/easy/core/Entity'

export default class User extends Entity {
    constructor( userFactory ) {
        super( userFactory )

        const self = this

        return this.database.Model.extend({
            tableName: 'users',

            role() {
                return this.belongsTo( self.bundleManager.getFactory( 'role' ).getModel() )
            }
        })
    }
}
