'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * User model
 */

var User = function User(userFactory) {
    _classCallCheck(this, User);

    var bundleManager = userFactory.bundleManager;
    var database = bundleManager.container.getComponent('Database').connection;

    return database.Model.extend({
        tableName: 'users',

        role: function role() {
            return this.belongsTo(bundleManager.getFactory('role').getModel());
        }
    });
};

exports.default = User;