/*
 * Role model
 */
export default class Role {
    constructor( roleFactory ) {
        const bundleManager = roleFactory.bundleManager
        const database      = bundleManager.container.getComponent( 'Database' ).connection

        return database.Model.extend({
            tableName: 'roles',

            users() {
                return this.hasMany( bundleManager.getFactory( 'user' ).getModel() )
            }
        })
    }
}
