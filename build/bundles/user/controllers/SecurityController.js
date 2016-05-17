'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SecurityController = function () {
    function SecurityController(userFactory) {
        _classCallCheck(this, SecurityController);

        this._userFactory = userFactory;
        this._bundleManager = this._userFactory.bundleManager;
        this._container = this._bundleManager.container;
        this._http = this._container.getComponent('Http');
        this._controller = this._container.getComponent('Controller');
        this._request = this._container.getComponent('Request');
        this._access = new (this._container.getService('security.access'))();
    }

    _createClass(SecurityController, [{
        key: 'authorize',
        value: function authorize() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                if (_this.controller.isProdEnv()) {
                    var token = _this.request.getBodyParameter('token');

                    access.restrict({
                        mustBe: [_this.access.any],
                        canCreate: [_this.access.admin],
                        canRead: [],
                        canUpdate: [_this.access.admin],
                        canDelete: [_this.access.admin]
                    });

                    if (_this.access.focusOn(token.role_id).canReach(_this.request.getMethod())) {
                        resolve();
                    } else {
                        _this.http.forbidden();
                        reject();
                    }
                } else {
                    resolve();
                }
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
        key: 'access',
        get: function get() {
            return this._access;
        }
    }]);

    return SecurityController;
}();

exports.default = SecurityController;