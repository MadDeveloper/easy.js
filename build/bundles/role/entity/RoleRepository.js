"use strict";

function RoleRepository(RoleFactory) {
    return {
        readAll: function readAll() {
            var Roles = RoleFactory.getCollection();
            return Roles.forge().fetch();
        },

        read: function read(id, options) {
            return RoleFactory.getModel().forge({ id: id }).fetch(options);
        },

        save: function save(role, params, options) {
            return role.save({
                name: params.name,
                slug: params.slug
            }, options);
        },

        patch: function patch(params, options) {},

        delete: function _delete(role, options) {
            return role.destroy(options);
        }
    };
}

module.exports = RoleRepository;