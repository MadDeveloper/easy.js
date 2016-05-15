'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = function () {
    function Container() {
        _classCallCheck(this, Container);
    }

    _createClass(Container, [{
        key: 'contructor',
        value: function contructor(kernel) {
            this._kernel = kernel;
            this._message = this.getComponent('Message');

            /*
             * Dependencies shared
             */
            this.shared = {};

            this._servicesDirectoryExists = false;
            this._checkExistanceOfServicesDirectory = true;
            this._servicesDirectoryPath = __dirname + '/../../../src/services';
        }
    }, {
        key: 'isComponentAlreadyLoaded',
        value: function isComponentAlreadyLoaded(component) {
            return this.shared.hasOwnProperty(component);
        }
    }, {
        key: 'getComponent',
        value: function getComponent(component, params) {
            if (!this.isComponentAlreadyLoaded(component)) {
                /*
                 * Special treatment for specifics dependencies
                 */
                switch (component.toLowerCase()) {
                    case 'http':
                        params = this;
                        break;
                    case 'request':
                        params = this.kernel.getAppName();
                        break;
                    case 'logger':
                        params = this;
                        break;
                    case 'controller':
                        params = this;
                        break;
                }

                this.shared[component] = new (this.kernel.load(component))(params);
            }

            return this.shared[component];
        }
    }, {
        key: 'getService',
        value: function getService(service, clearCache) {
            if (false !== this.checkExistanceOfServicesDirectory && false === this.servicesDirectoryExists) {
                var statsServiceDirectory = _fs2.default.lstatSync(this.servicesDirectoryPath);

                if (statsServiceDirectory.isDirectory()) {
                    this.servicesDirectoryExists = true;
                } else {
                    this.message.error({
                        title: "Service directory not found",
                        message: "Service directory, path: " + this.servicesDirectoryPath + " not found.",
                        type: 'error',
                        exit: 0
                    });
                }
            }

            var serviceInfo = service.split('/');
            var serviceName = serviceInfo[0];
            var serviceComponent = serviceInfo[1];
            var serviceNameDirectory = this.servicesDirectoryPath + '/' + serviceName;
            var serviceComponentFile = serviceNameDirectory + '/' + serviceComponent + '.js';

            try {
                var statsServiceNameDirectory = _fs2.default.lstatSync(serviceNameDirectory);

                if (statsServiceNameDirectory.isDirectory()) {

                    try {
                        var statsServiceComponentDirectory = _fs2.default.lstatSync(serviceComponentFile);

                        if (statsServiceComponentDirectory.isFile()) {

                            if (clearCache) {
                                delete require.cache[require.resolve(serviceComponentFile)];
                            }

                            return require(serviceComponentFile);
                        } else {
                            throw new Error();
                        }
                    } catch (error) {
                        this.message.error({
                            title: "Impossible to call service",
                            message: error,
                            type: 'error',
                            exit: 0
                        });
                    }
                } else {
                    throw new Error();
                }
            } catch (error) {
                this.message.error({
                    title: "Impossible to call service",
                    message: "Service name " + serviceName + " not found, path: " + _path2.default.resolve(serviceNameDirectory) + "\n" + error,
                    type: 'error',
                    exit: 0
                });
            }
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
        set: function set(path) {
            this._servicesDirectoryPath = path;
            return this;
        }
    }]);

    return Container;
}();

exports.default = Container;