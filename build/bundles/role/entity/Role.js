'use strict';

/*
 * Role model
 */
function Role(RoleFactory) {
    var BundleManager = RoleFactory.getBundleManager();

    return RoleFactory.getDatabase().Model.extend({
        tableName: 'roles',

        users: function users() {
            return this.hasMany(BundleManager.getFactory('User').getModel());
        }
    });
}

module.exports = Role;