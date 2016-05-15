'use strict';

/*
 * User model
 */
function User(UserFactory) {
    var BundleManager = UserFactory.getBundleManager();

    return UserFactory.getDatabase().Model.extend({
        tableName: 'users',

        role: function role() {
            return this.belongsTo(BundleManager.getFactory('Role').getModel());
        }
    });
}

module.exports = User;