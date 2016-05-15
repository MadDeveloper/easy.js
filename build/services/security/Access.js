'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * You can edit as you want following roles.
 * Becareful: You must start your roles' id at 3
 * Roles' id are mapped with ids into database
 * example:
 *
 * var roleModerator = 3
 */

var Access = function () {
    function Access() {
        _classCallCheck(this, Access);

        /*
         * BECAREFUL WHEN EDITING OR DELETING THE FOLLOWING VARIABLES
         */
        this._any = 0;
        this._admin = 1;
        this._user = 2;
        this._focus = this._any;
        this._restrictions = {};
    }

    _createClass(Access, [{
        key: 'isAdmin',
        value: function isAdmin() {
            return focus === roleAdmin;
        }
    }, {
        key: 'isUser',
        value: function isUser() {
            return focus === roleUser;
        }
    }, {
        key: 'isAny',
        value: function isAny() {
            return focus === roleAny;
        }
    }, {
        key: 'focusOn',
        value: function focusOn(role) {
            this.focus = role;
            return this;
        }
    }, {
        key: 'restrict',
        value: function restrict(params) {
            if (!params.mustBe || params.mustBe.length === 0) {
                params.mustBe = [this.any];
            }

            if (!params.canRead || params.canRead.length === 0) {
                params.canRead = params.mustBe;
            }

            if (!params.canCreate || params.canCreate.length === 0) {
                params.canCreate = params.mustBe;
            }

            if (!params.canUpdate || params.canUpdate.length === 0) {
                params.canUpdate = params.mustBe;
            }

            if (!params.canDelete || params.canDelete.length === 0) {
                params.canDelete = params.mustBe;
            }

            /*
             * An admin as all privileges
             */
            if (_lodash2.default.indexOf(params.mustBe, this.admin) === -1) {
                params.mustBe.push(this.admin);
            }

            if (_lodash2.default.indexOf(params.canRead, this.admin) === -1) {
                params.canRead.push(this.admin);
            }

            if (_lodash2.default.indexOf(params.canCreate, this.admin) === -1) {
                params.canCreate.push(this.admin);
            }

            if (_lodash2.default.indexOf(params.canUpdate, this.admin) === -1) {
                params.canUpdate.push(this.admin);
            }

            if (_lodash2.default.indexOf(params.canDelete, this.admin) === -1) {
                params.canDelete.push(this.admin);
            }

            this.restrictions = params;

            return this;
        }
    }, {
        key: 'canReach',
        value: function canReach(httpMethod) {
            var isAuthorizedToReach = false;

            var method = httpMethod.toLowerCase();
            var authorized = _lodash2.default.indexOf(this.restrictions.mustBe, this.focus) !== -1 || _lodash2.default.indexOf(this.restrictions.mustBe, this.any) !== -1;

            if (authorized) {

                var methodWhenReading = ['get'];
                var methodWhenCreating = ['post'];
                var methodWhenUpdating = ['put', 'patch'];
                var methodWhenDeleting = ['delete'];

                if (_lodash2.default.indexOf(methodWhenReading, method) !== -1) {

                    isAuthorizedToReach = _lodash2.default.indexOf(this.restrictions.canRead, focus) !== -1 || _lodash2.default.indexOf(this.restrictions.canRead, this.any) !== -1;
                } else if (_lodash2.default.indexOf(methodWhenCreating, method) !== -1) {

                    isAuthorizedToReach = _lodash2.default.indexOf(this.restrictions.canCreate, focus) !== -1 || _lodash2.default.indexOf(this.restrictions.canCreate, this.any) !== -1;
                } else if (_lodash2.default.indexOf(methodWhenUpdating, method) !== -1) {

                    isAuthorizedToReach = _lodash2.default.indexOf(this.restrictions.canUpdate, focus) !== -1 || _lodash2.default.indexOf(this.restrictions.canUpdate, this.any) !== -1;
                } else if (_lodash2.default.indexOf(methodWhenDeleting, method) !== -1) {

                    isAuthorizedToReach = _lodash2.default.indexOf(this.restrictions.canDelete, focus) !== -1 || _lodash2.default.indexOf(this.restrictions.canDelete, this.any) !== -1;
                }
            }

            return isAuthorizedToReach;
        }

        /*
         * Getters and setters
         */

    }, {
        key: 'any',
        get: function get() {
            return this._any;
        },
        set: function set(any) {
            this._any = any;
            return this;
        }
    }, {
        key: 'admin',
        get: function get() {
            return this._admin;
        },
        set: function set(admin) {
            this._admin = admin;
            return this;
        }
    }, {
        key: 'user',
        get: function get() {
            return this._user;
        },
        set: function set(user) {
            this._user = user;
            return this;
        }
    }, {
        key: 'focus',
        get: function get() {
            return this._focus;
        },
        set: function set(focus) {
            this._focus = focus;
            return this;
        }
    }, {
        key: 'restrictions',
        get: function get() {
            return this._restrictions;
        },
        set: function set(restrictions) {
            this._restrictions = restrictions;
            return this;
        }
    }]);

    return Access;
}();

exports.default = Access;