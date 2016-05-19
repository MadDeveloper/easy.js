/*
 * User model
 */
export default class User {
    constructor( userFactory ) {
        const bundleManager = userFactory.bundleManager
        const database      = bundleManager.container.getComponent( 'Database' ).connection

        return database.Model.extend({
            tableName: 'users',

            role() {
                return this.belongsTo( bundleManager.getFactory( 'role' ).getModel() )
            }
        })
    }
}
