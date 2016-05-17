"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoleRepository = function () {
    function RoleRepository(roleFactory) {
        _classCallCheck(this, RoleRepository);

        this._roleFactory = roleFactory;
    }

    _createClass(RoleRepository, [{
        key: "readAll",
        value: function readAll() {
            var roles = this.roleFactory.getCollection();

            return roles.forge().fetch();
        }
    }, {
        key: "read",
        value: function read(id, options) {
            return this.roleFactory.getModel().forge({ id: id }).fetch(options);
        }
    }, {
        key: "save",
        value: function save(role, params, options) {
            return role.save({
                name: params.name,
                slug: params.slug
            }, options);
        }
    }, {
        key: "patch",
        value: function patch(params, options) {}
    }, {
        key: "delete",
        value: function _delete(role, options) {
            return role.destroy(options);
        }

        /*
         * Getters and setters
         */

    }, {
        key: "skeletonFactory",
        get: function get() {
            return this._skeletonFactory;
        }
    }]);

    return RoleRepository;
}();

exports.default = RoleRepository;