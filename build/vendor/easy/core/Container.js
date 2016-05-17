'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('./../../../config/services/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = function () {
    function Container(kernel) {
        _classCallCheck(this, Container);

        this._kernel = kernel;

        /*
         * Dependencies shared
         */
        this._componentsLoaded = {};
        this._shared = {};

        this._servicesDirectoryExists = false;
        this._checkExistanceOfServicesDirectory = true;
        this._servicesDirectoryPath = this._kernel.path.services;

        this._componentsMapping = {
            'bundlemanager': this._kernel.path.easy + '/core/BundleManager',
            'controller': this._kernel.path.easy + '/core/Controller',
            'logger': this._kernel.path.easy + '/core/Logger',
            'message': this._kernel.path.easy + '/core/Message',
            'polyfills': this._kernel.path.easy + '/core/Polyfills',
            'connector': this._kernel.path.easy + '/core/database/Connector',
            'http': this._kernel.path.easy + '/core/http/Http',
            'request': this._kernel.path.easy + '/core/http/Request',
            'response': this._kernel.path.easy + '/core/http/Response'
        };

        this._servicesMapping = _config2.default;
    }

    /*
     * Components
     */

    _createClass(Container, [{
        key: 'loadComponent',
        value: function loadComponent(name) {
            if ("undefined" === typeof this.componentsLoaded[name]) {
                if (this.componentsMapping.hasOwnProperty(name)) {
                    var pathComponent = this.componentsMapping[name] + '.js';

                    if (_fs2.default.statSync(pathComponent).isFile()) {
                        this.componentsLoaded[name] = new (require(pathComponent))(this);
                    }
                }
            }
        }
    }, {
        key: 'loadComponents',
        value: function loadComponents() {
            for (var componentName in this.componentsMapping) {
                if (this.componentsMapping.hasOwnProperty(componentName)) {
                    this.loadComponent(componentName);
                }
            }
        }
    }, {
        key: 'getComponent',
        value: function getComponent(name) {
            name = name.toLowerCase();

            if (this.isComponentMapped(name)) {
                if (!this.isComponentLoaded(name)) {
                    this.loadComponent(name);
                }

                return this.componentsLoaded[name];
            } else {
                return undefined;
            }
        }
    }, {
        key: 'isComponentLoaded',
        value: function isComponentLoaded(name) {
            return this.componentsLoaded.hasOwnProperty(name);
        }
    }, {
        key: 'isComponentMapped',
        value: function isComponentMapped(name) {
            return this.componentsMapping.hasOwnProperty(name);
        }

        /*
         * Services
         */

    }, {
        key: 'isServiceMapped',
        value: function isServiceMapped(name) {
            return this.servicesMapping.hasOwnProperty(name);
        }
    }, {
        key: 'isServicesLoaded',
        value: function isServicesLoaded(name) {
            return this.shared.hasOwnProperty(name);
        }
    }, {
        key: 'storeService',
        value: function storeService(name, pathService) {
            this.shared[name] = new (require(pathService))(this);
        }
    }, {
        key: 'resetService',
        value: function resetService(name) {
            delete this.shared[name];
        }
    }, {
        key: 'getService',
        value: function getService(name, clearCache) {
            this.servicesCheckDirectory();

            if (this.isServiceMapped(name)) {

                var serviceFile = this.servicesDirectoryPath + '/' + this.servicesMapping[name] + '.js';

                try {
                    var statsServiceFile = _fs2.default.lstatSync(serviceFile);

                    if (statsServiceNameDirectory.isFile()) {

                        this.storeService(name, serviceFile);

                        return this.shared[service];
                    } else {
                        throw new Error();
                    }
                } catch (error) {
                    this.getComponent('Message').error({
                        title: "Impossible to call service",
                        message: "Service " + name + " not found, path: " + _path2.default.resolve(serviceFile) + "\n" + error,
                        type: 'error',
                        exit: 0
                    });
                }
            } else {
                return undefined;
            }
        }
    }, {
        key: 'servicesCheckDirectory',
        value: function servicesCheckDirectory() {
            if (false !== this.checkExistanceOfServicesDirectory && false === this.servicesDirectoryExists) {
                var statsServiceDirectory = _fs2.default.lstatSync(this.servicesDirectoryPath);

                if (statsServiceDirectory.isDirectory()) {
                    this.servicesDirectoryExists = true;
                } else {
                    this.getComponent('Message').error({
                        title: "Service directory not found",
                        message: "Service directory path resolved: " + this.servicesDirectoryPath,
                        type: 'error',
                        exit: 0
                    });
                }
            }

            return true;
        }

        /*
         * Getters and setters
         */

    }, {
        key: 'kernel',
        get: function get() {
            return this._kernel;
        }
    }, {
        key: 'message',
        get: function get() {
            return this._message;
        }
    }, {
        key: 'servicesDirectoryExists',
        get: function get() {
            return this._servicesDirectoryExists;
        },
        set: function set(exists) {
            this._servicesDirectoryExists = exists;
            return this;
        }
    }, {
        key: 'checkExistanceOfServicesDirectory',
        get: function get() {
            return this._checkExistanceOfServicesDirectory;
        },
        set: function set(check) {
            this._checkExistanceOfServicesDirectory = check;
            return this;
        }
    }, {
        key: 'servicesDirectoryPath',
        get: function get() {
            return this._servicesDirectoryPath;
        },
        set: function set(directoryPath) {
            this._servicesDirectoryPath = directoryPath;
            return this;
        }
    }, {
        key: 'componentsLoaded',
        get: function get() {
            return this._componentsLoaded;
        }
    }, {
        key: 'shared',
        get: function get() {
            return this._shared;
        }
    }, {
        key: 'componentsMapping',
        get: function get() {
            return this._componentsMapping;
        }
    }, {
        key: 'servicesMapping',
        get: function get() {
            return this._servicesMapping;
        }
    }]);

    return Container;
}();

exports.default = Container;