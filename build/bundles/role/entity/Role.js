'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Role model
 */

var Role = function Role(roleFactory) {
    _classCallCheck(this, Role);

    var bundleManager = roleFactory.bundleManager;

    return roleFactory.database.Model.extend({
        tableName: 'roles',

        users: function users() {
            return this.hasMany(bundleManager.getFactory('User').getModel());
        }
    });
};

exports.default = Role;