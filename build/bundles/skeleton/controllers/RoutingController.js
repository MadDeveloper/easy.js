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
    function RoutingController(skeletonFactory) {
        _classCallCheck(this, RoutingController);

        this._skeletonFactory = skeletonFactory;
        this._bundleManager = this._skeletonFactory.bundleManager;
        this._router = this._bundleManager.router;
        this._database = this._bundleManager.database;
        this._container = this._bundleManager.container;
        this._http = this._container.getComponent('Http');
        this._controller = this._container.getComponent('Controller');
        this._request = this._container.getComponent('Request');
        this._skeletonRepository = this._skeletonFactory.getRepository();
    }

    _createClass(RoutingController, [{
        key: 'isRequestWellParameterized',
        value: function isRequestWellParameterized() {
            return this.controller.verifyParams([{ property: 'example', typeExpected: 'string' }], this.request.getBody());
        }
    }, {
        key: 'getSkeletons',
        value: function getSkeletons() {
            this.skeletonRepository.readAll().then(function (skeletons) {

                http.ok(skeletons.toJSON());
            }).catch(function (error) {
                http.internalServerError(error);
            });
        }
    }, {
        key: 'createSkeleton',
        value: function createSkeleton() {
            var _this = this;

            if (this.isRequestWellParameterized()) {

                this.database.transaction(function (t) {

                    _this.skeletonRepository.save(_this.skeletonFactory.getNewModel(), _this.request.getBody(), { transacting: t }).then(function (skeleton) {

                        t.commit();
                        http.created(skeleton.toJSON());
                    }).catch(function (error) {
                        t.rollback();
                        http.internalServerError(error);
                    });
                });
            } else {
                http.badRequest();
            }
        }
    }, {
        key: 'getSkeleton',
        value: function getSkeleton() {
            http.ok(this.request.find('skeleton').toJSON());
        }
    }, {
        key: 'updateSkeleton',
        value: function updateSkeleton() {
            var _this2 = this;

            if (this.isRequestWellParameterized()) {

                this.database.transaction(function (t) {

                    _this2.skeletonRepository.save(_this2.request.find('skeleton'), _this2.request.getBody(), { transacting: t }).then(function (skeleton) {

                        t.commit();
                        http.ok(skeleton.toJSON());
                    }).catch(function (error) {
                        t.rollback();
                        http.internalServerError(error);
                    });
                });
            } else {
                http.badRequest();
            }
        }
    }, {
        key: 'patchSkeleton',
        value: function patchSkeleton() {
            var _this3 = this;

            if (this.controller.isPatchRequestWellParameterized(req)) {
                var patchRequestCorrectlyFormed = false;

                var patchSkeleton = new Promise(function (resolve, reject) {
                    var validPaths = ['/property'];
                    var ops = _this3.controller.parsePatchParams(_this3.request.getScope());

                    if (ops) {
                        (function () {
                            patchRequestCorrectlyFormed = true;
                            var opsLength = ops.length;
                            var currentPatch = 0;

                            _this3.database.transaction(function (t) {

                                ops.forEach(function (patch) {
                                    switch (patch.op) {
                                        case 'replace':
                                            if (_lodash2.default.indexOf(validPaths, patch.path) >= 0) {
                                                _this3.skeletonRepository.patch(_this3.request.find('skeleton'), patch, { transacting: t, patch: true }).then(function (skeleton) {
                                                    if (++currentPatch >= opsLength) {
                                                        // It's ok
                                                        t.commit();
                                                        resolve(skeleton);
                                                    }
                                                }).catch(function (error) {
                                                    t.rollback();
                                                    reject(error);
                                                });
                                            }
                                            break;
                                    }
                                });
                            });
                        })();
                    }
                });

                if (patchRequestCorrectlyFormed) {

                    patchSkeleton.then(function (skeleton) {

                        http.ok(skeleton.toJSON());
                    }).catch(function (error) {
                        http.internalServerError(error);
                    });
                } else {
                    http.badRequest();
                }
            } else {
                http.badRequest();
            }
        }
    }, {
        key: 'deleteSkeleton',
        value: function deleteSkeleton() {
            var _this4 = this;

            this.database.transaction(function (t) {

                _this4.skeletonRepository.delete(_this4.request.find('skeleton'), { transacting: t }).then(function () {

                    t.commit();
                    http.noContent();
                }).catch(function (error) {
                    t.rollback();
                    http.internalServerError(error);
                });
            });
        }

        /*
         * Getters and setters
         */

    }, {
        key: 'skeletonFactory',
        get: function get() {
            return this._skeletonFactory;
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
        key: 'skeletonRepository',
        get: function get() {
            return this._skeletonRepository;
        }
    }]);

    return RoutingController;
}();

exports.default = RoutingController;