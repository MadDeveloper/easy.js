'use strict';

function UserRepository(UserFactory) {
    return {
        readAll: function readAll(role) {
            var User = UserFactory.getModel();
            return User.where({ role_id: role.get('id') }).fetchAll();
        },

        read: function read(byParam, options) {
            var User = UserFactory.getModel();
            var forgeParam = UserFactory.getVendorController().isNumber(byParam) ? { id: byParam } : undefined !== byParam.id ? { id: byParam.id } : { email: byParam.email };
            return User.forge(forgeParam).fetch(options);
        },

        save: function save(user, params, options) {
            return user.save({
                username: params.username,
                email: params.email,
                password: params.password,
                role_id: params.role_id
            }, options);
        },

        delete: function _delete(user, options) {
            return user.destroy(options);
        }
    };
}

module.exports = UserRepository;