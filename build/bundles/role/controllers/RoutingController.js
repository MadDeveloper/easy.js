'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RoutingController = function () {
    function RoutingController(roleFactory) {
        _classCallCheck(this, RoutingController);

        this._roleFactory = roleFactory;
        this._bundleManager = this._roleFactory.bundleManager;
        this._router = this._bundleManager.router;
        this._database = this._bundleManager.database;
        this._container = this._bundleManager.container;
        this._http = this._container.getComponent('Http');
        this._controller = this._container.getComponent('Controller');
        this._request = this._container.getComponent('Request');
        this._roleRepository = this._roleFactory.getRepository();
    }

    _createClass(RoutingController, [{
        key: 'isRequestWellParameterized',
        value: function isRequestWellParameterized() {
            return this.controller.verifyParams([{ property: 'name', typeExpected: 'string' }, { property: 'slug', typeExpected: 'string' }], this.request.getBody());
        }
    }, {
        key: 'getRoles',
        value: function getRoles() {
            var _this = this;

            this.roleRepository.readAll().then(function (roles) {

                _this.http.ok(roles.toJSON());
            }).catch(function (error) {
                _this.http.internalServerError(error);
            });
        }
    }, {
        key: 'createRole',
        value: function createRole() {
            var _this2 = this;

            if (this.isRequestWellParameterized()) {

                this.database.transaction(function (t) {

                    _this2.roleRepository.save(_this2.roleFactory.getNewModel(), _this2.request.getBody(), { transacting: t }).then(function (role) {

                        t.commit();
                        _this2.http.created(role.toJSON());
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
        key: 'getRole',
        value: function getRole() {
            this.http.ok(this.request.find('role').toJSON());
        }
    }, {
        key: 'updateRole',
        value: function updateRole() {
            if (this.isRequestWellParameterized()) {

                this.database.transaction(function (t) {
                    var _this3 = this;

                    this.roleRepository.save(this.request.find('role'), this.request.getBody(), { transacting: t }).then(function (role) {

                        t.commit();
                        _this3.http.ok(role.toJSON());
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
        key: 'deleteRole',
        value: function deleteRole() {
            var _this4 = this;

            this.database.transaction(function (t) {

                _this4.roleRepository.delete(_this4.request.find('role'), { transacting: t }).then(function () {

                    t.commit();
                    _this4.http.noContent();
                }).catch(function (error) {
                    t.rollback();
                    _this4.http.internalServerError(error);
                });
            });
        }
    }]);

    return RoutingController;
}();

exports.default = RoutingController;