'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoutingController = function () {
    function RoutingController(userFactory) {
        _classCallCheck(this, RoutingController);

        this._userFactory = userFactory;
        this._bundleManager = this._userFactory.bundleManager;
        this._router = this._bundleManager.router;
        this._database = this._bundleManager.database;
        this._container = this._bundleManager.container;
        this._http = this._container.getComponent('Http');
        this._controller = this._container.getComponent('Controller');
        this._request = this._container.getComponent('Request');
        this._userRepository = this._userFactory.getRepository();
        this._roleFactory = this._bundleManager.getFactory('Role');
        this._roleRepository = this._roleFactory.getRepository();
    }

    _createClass(RoutingController, [{
        key: 'isRequestWellParameterized',
        value: function isRequestWellParameterized() {
            return this.controller.verifyParams([{ property: 'username', typeExpected: 'string' }, { property: 'email', typeExpected: 'string' }, { property: 'password', typeExpected: 'string' }, { property: 'role_id', typeExpected: 'number', optional: true }], this.request.getBody());
        }
    }, {
        key: 'getUsers',
        value: function getUsers() {
            var _this = this;

            this.userRepository.readAll(this.request.find('role')).then(function (users) {

                _this.http.ok(users.toJSON());
            }).catch(function (error) {
                _this.http.internalServerError(error);
            });
        }
    }, {
        key: 'createUser',
        value: function createUser() {
            var _this2 = this;

            if (this.isRequestWellParameterized()) {

                this.database.transaction(function (t) {

                    _this2.request.setBodyParameter('role_id', _this2.request.getRouteParameter('idRole'));

                    _this2.userRepository.save(UserFactory.getNewModel(), _this2.request.getBody(), { transacting: t }).then(function (user) {
                        t.commit();
                        _this2.http.created(user.toJSON());
                    }).catch(function (error) {
                        t.rollback();
                        _this2.http.internalServerError(error);
                    });
                });
            } else {
                this.http.badRequest();
            }
        }
    }, {
        key: 'getUser',
        value: function getUser() {
            this.http.ok(this.request.find('user').toJSON());
        }
    }, {
        key: 'updateUser',
        value: function updateUser() {
            var _this3 = this;

            if (this.isRequestWellParameterized()) {

                this.database.transaction(function (t) {

                    if (typeof _this3.request.getBodyParameter('role_id') === "undefined") {
                        _this3.request.setBodyParameter('role_id', _this3.request.getRouteParameter('idRole'));
                    }

                    _this3.userRepository.save(_this3.request.find('user'), _this3.request.getBody(), { transacting: t }).then(function (user) {

                        t.commit();
                        _this3.http.ok(user.toJSON());
                    }).catch(function (error) {
                        t.rollback();
                        _this3.http.internalServerError(error);
                    });
                });
            } else {
                this.http.badRequest();
            }
        }
    }, {
        key: 'patchUser',
        value: function patchUser() {}
    }, {
        key: 'deleteUser',
        value: function deleteUser() {
            var _this4 = this;

            this.database.transaction(function (t) {

                _this4.userRepository.delete(_this4.request.find('user'), { transacting: t }).then(function () {

                    t.commit();
                    _this4.http.noContent();
                }).catch(function (error) {
                    t.rollback();
                    _this4.http.internalServerError(error);
                });
            });
        }

        /*
         * Getters and setters
         */

    }, {
        key: 'userFactory',
        get: function get() {
            return this._userFactory;
        }
    }, {
        key: 'bundleManager',
        get: function get() {
            return this._bundleManager;
        }
    }, {
        key: 'router',
        get: function get() {
            return this._router;
        }
    }, {
        key: 'database',
        get: function get() {
            return this._database;
        }
    }, {
        key: 'container',
        get: function get() {
            return this._container;
        }
    }, {
        key: 'http',
        get: function get() {
            return this._http;
        }
    }, {
        key: 'controller',
        get: function get() {
            return this._controller;
        }
    }, {
        key: 'request',
        get: function get() {
            return this._request;
        }
    }, {
        key: 'userRepository',
        get: function get() {
            return this._userRepository;
        }
    }, {
        key: 'roleFactory',
        get: function get() {
            return this._roleFactory;
        }
    }, {
        key: 'roleRepository',
        get: function get() {
            return this._roleRepository;
        }
    }]);

    return RoutingController;
}();

exports.default = RoutingController;