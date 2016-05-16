'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MiddlewaresController = function () {
    function MiddlewaresController(userFactory) {
        _classCallCheck(this, MiddlewaresController);

        this._userFactory = userFactory;
        this._bundleManager = this._userFactory.bundleManager;
        this._container = this._bundleManager.container;
        this._http = this._container.getComponent('Http');
        this._controller = this._container.getComponent('Controller');
        this._request = this._container.getComponent('Request');
    }

    _createClass(MiddlewaresController, [{
        key: 'userExists',
        value: function userExists() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var requireOptions = {
                    requireBy: _this.request.getRouteParameter('idUser'),
                    options: {}
                };

                _this.controller.doesRequiredElementExists('User', requireOptions, _this.bundleManager, function (user) {
                    _this.request.define('user', user);
                    resolve();
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
    }]);

    return MiddlewaresController;
}();

exports.default = MiddlewaresController;