'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Controller2 = require('./../../../vendor/easy/core/Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoutingController = function (_Controller) {
    _inherits(RoutingController, _Controller);

    function RoutingController(userFactory) {
        _classCallCheck(this, RoutingController);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RoutingController).call(this, userFactory.container));

        _this._userFactory = userFactory;
        _this._userRepository = _this._userFactory.getRepository();
        _this._roleFactory = _this._bundleManager.getFactory('role');
        _this._roleRepository = _this._roleFactory.getRepository();
        return _this;
    }

    _createClass(RoutingController, [{
        key: 'isRequestWellParameterized',
        value: function isRequestWellParameterized() {
            return this.verifyParams([{ property: 'username', typeExpected: 'string' }, { property: 'email', typeExpected: 'string' }, { property: 'password', typeExpected: 'string' }, { property: 'role_id', typeExpected: 'number', optional: true }], this.request.getBody());
        }
    }, {
        key: 'getUsers',
        value: function getUsers() {
            var _this2 = this;

            this.userRepository.readAll(this.request.find('role')).then(function (users) {

                _this2.response.ok(users.toJSON());
            }).catch(function (error) {
                _this2.response.internalServerError(error);
            });
        }
    }, {
        key: 'createUser',
        value: function createUser() {
            var _this3 = this;

            if (this.isRequestWellParameterized()) {

                this.database.transaction(function (t) {

                    _this3.request.setBodyParameter('role_id', _this3.request.getRouteParameter('idRole'));

                    _this3.userRepository.save(UserFactory.getNewModel(), _this3.request.getBody(), { transacting: t }).then(function (user) {
                        t.commit();
                        _this3.response.created(user.toJSON());
                    }).catch(function (error) {
                        t.rollback();
                        _this3.response.internalServerError(error);
                    });
                });
            } else {
                this.response.badRequest();
            }
        }
    }, {
        key: 'getUser',
        value: function getUser() {
            this.response.ok(this.request.find('user').toJSON());
        }
    }, {
        key: 'updateUser',
        value: function updateUser() {
            var _this4 = this;

            if (this.isRequestWellParameterized()) {

                this.database.transaction(function (t) {

                    if (typeof _this4.request.getBodyParameter('role_id') === "undefined") {
                        _this4.request.setBodyParameter('role_id', _this4.request.getRouteParameter('idRole'));
                    }

                    _this4.userRepository.save(_this4.request.find('user'), _this4.request.getBody(), { transacting: t }).then(function (user) {

                        t.commit();
                        _this4.response.ok(user.toJSON());
                    }).catch(function (error) {
                        t.rollback();
                        _this4.response.internalServerError(error);
                    });
                });
            } else {
                this.response.badRequest();
            }
        }
    }, {
        key: 'patchUser',
        value: function patchUser() {}
    }, {
        key: 'deleteUser',
        value: function deleteUser() {
            var _this5 = this;

            this.database.transaction(function (t) {

                _this5.userRepository.delete(_this5.request.find('user'), { transacting: t }).then(function () {

                    t.commit();
                    _this5.response.noContent();
                }).catch(function (error) {
                    t.rollback();
                    _this5.response.internalServerError(error);
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
}(_Controller3.default);

exports.default = RoutingController;