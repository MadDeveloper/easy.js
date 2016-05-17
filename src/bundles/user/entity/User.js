/*
 * User model
 */
export default class User {
    constructor( userFactory ) {
        const bundleManager = userFactory.bundleManager

        return userFactory.database.Model.extend({
            tableName: 'users',

            role() {
                return this.belongsTo( bundleManager.getFactory( 'Role' ).getModel() )
            }
        })
    }
}
