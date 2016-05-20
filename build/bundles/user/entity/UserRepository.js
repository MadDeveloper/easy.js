'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserRepository = function () {
    function UserRepository(userFactory) {
        _classCallCheck(this, UserRepository);

        this._userFactory = userFactory;
    }

    _createClass(UserRepository, [{
        key: 'readAll',
        value: function readAll(role) {
            var user = this.userFactory.getModel();

            return user.where({ role_id: role.get('id') }).fetchAll();
        }
    }, {
        key: 'read',
        value: function read(byParam, options) {
            var user = this.userFactory.getModel();
            var forgeParam = typeof byParam === "number" || typeof byParam === 'string' && byParam.isNumber() ? { id: byParam } : undefined !== byParam.id ? { id: byParam.id } : { email: byParam.email };

            return user.forge(forgeParam).fetch(options);
        }
    }, {
        key: 'save',
        value: function save(user, params, options) {
            return user.save({
                username: params.username,
                email: params.email,
                password: params.password,
                role_id: params.role_id
            }, options);
        }
    }, {
        key: 'delete',
        value: function _delete(user, options) {
            return user.destroy(options);
        }

        /*
         * Getters and setters
         */

    }, {
        key: 'userFactory',
        get: function get() {
            return this._userFactory;
        }
    }]);

    return UserRepository;
}();

exports.default = UserRepository;