/*
 * Role model
 */
export default class Role {
    constructor( roleFactory ) {
        const bundleManager = roleFactory.bundleManager

        return roleFactory.database.Model.extend({
            tableName: 'roles',

            users() {
                return this.hasMany( bundleManager.getFactory( 'User' ).getModel() )
            }
        })
    }
}
