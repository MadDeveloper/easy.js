'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Controller2 = require('./../../../vendor/easy/core/Controller');

var _Controller3 = _interopRequireDefault(_Controller2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoutingController = function (_Controller) {
    _inherits(RoutingController, _Controller);

    function RoutingController(roleFactory) {
        _classCallCheck(this, RoutingController);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RoutingController).call(this, roleFactory.container));

        _this._roleFactory = roleFactory;
        _this._roleRepository = _this._roleFactory.getRepository();
        return _this;
    }

    _createClass(RoutingController, [{
        key: 'isRequestWellParameterized',
        value: function isRequestWellParameterized() {
            return this.verifyParams([{ property: 'name', typeExpected: 'string' }, { property: 'slug', typeExpected: 'string' }], this.request.getBody());
        }
    }, {
        key: 'getRoles',
        value: function getRoles() {
            var _this2 = this;

            this.roleRepository.readAll().then(function (roles) {

                _this2.response.ok(roles.toJSON());
            }).catch(function (error) {
                _this2.response.internalServerError(error);
            });
        }
    }, {
        key: 'createRole',
        value: function createRole() {
            var _this3 = this;

            if (this.isRequestWellParameterized()) {

                this.database.transaction(function (t) {

                    _this3.roleRepository.save(_this3.roleFactory.getNewModel(), _this3.request.getBody(), { transacting: t }).then(function (role) {

                        t.commit();
                        _this3.response.created(role.toJSON());
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
        key: 'getRole',
        value: function getRole() {
            this.response.ok(this.request.find('role').toJSON());
        }
    }, {
        key: 'updateRole',
        value: function updateRole() {
            if (this.isRequestWellParameterized()) {

                this.database.transaction(function (t) {
                    var _this4 = this;

                    this.roleRepository.save(this.request.find('role'), this.request.getBody(), { transacting: t }).then(function (role) {

                        t.commit();
                        _this4.response.ok(role.toJSON());
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
        key: 'deleteRole',
        value: function deleteRole() {
            var _this5 = this;

            this.database.transaction(function (t) {

                _this5.roleRepository.delete(_this5.request.find('role'), { transacting: t }).then(function () {

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