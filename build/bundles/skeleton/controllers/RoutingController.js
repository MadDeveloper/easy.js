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

    function RoutingController(skeletonFactory) {
        _classCallCheck(this, RoutingController);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RoutingController).call(this, skeletonFactory.container));

        _this._skeletonFactory = skeletonFactory;
        _this._skeletonRepository = _this._skeletonFactory.getRepository();
        return _this;
    }

    _createClass(RoutingController, [{
        key: 'isRequestWellParameterized',
        value: function isRequestWellParameterized() {
            return this.verifyParams([{ property: 'example', typeExpected: 'string' }], this.request.getBody());
        }
    }, {
        key: 'getSkeletons',
        value: function getSkeletons() {
            var _this2 = this;

            this.skeletonRepository.readAll().then(function (skeletons) {

                _this2.response.ok(skeletons.toJSON());
            }).catch(function (error) {
                _this2.response.internalServerError(error);
            });
        }
    }, {
        key: 'createSkeleton',
        value: function createSkeleton() {
            var _this3 = this;

            if (this.isRequestWellParameterized()) {

                this.database.transaction(function (t) {

                    _this3.skeletonRepository.save(_this3.skeletonFactory.getNewModel(), _this3.request.getBody(), { transacting: t }).then(function (skeleton) {

                        t.commit();
                        _this3.response.created(skeleton.toJSON());
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
        key: 'getSkeleton',
        value: function getSkeleton() {
            this.response.ok(this.request.find('skeleton').toJSON());
        }
    }, {
        key: 'updateSkeleton',
        value: function updateSkeleton() {
            var _this4 = this;

            if (this.isRequestWellParameterized()) {

                this.database.transaction(function (t) {

                    _this4.skeletonRepository.save(_this4.request.find('skeleton'), _this4.request.getBody(), { transacting: t }).then(function (skeleton) {

                        t.commit();
                        _this4.response.ok(skeleton.toJSON());
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
        key: 'patchSkeleton',
        value: function patchSkeleton() {
            var _this5 = this;

            if (this.isPatchRequestWellParameterized()) {
                var patchRequestCorrectlyFormed = false;

                var patchSkeleton = new Promise(function (resolve, reject) {
                    var validPaths = ['/property'];
                    var ops = _this5.parsePatchParams();

                    if (ops) {
                        (function () {
                            patchRequestCorrectlyFormed = true;
                            var opsLength = ops.length;
                            var currentPatch = 0;

                            _this5.database.transaction(function (t) {

                                ops.forEach(function (patch) {
                                    switch (patch.op) {
                                        case 'replace':
                                            if (_lodash2.default.indexOf(validPaths, patch.path) >= 0) {
                                                _this5.skeletonRepository.patch(_this5.request.find('skeleton'), patch, { transacting: t, patch: true }).then(function (skeleton) {
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

                        _this5.response.ok(skeleton.toJSON());
                    }).catch(function (error) {
                        _this5.response.internalServerError(error);
                    });
                } else {
                    this.response.badRequest();
                }
            } else {
                this.response.badRequest();
            }
        }
    }, {
        key: 'deleteSkeleton',
        value: function deleteSkeleton() {
            var _this6 = this;

            this.database.transaction(function (t) {

                _this6.skeletonRepository.delete(_this6.request.find('skeleton'), { transacting: t }).then(function () {

                    t.commit();
                    _this6.response.noContent();
                }).catch(function (error) {
                    t.rollback();
                    _this6.response.internalServerError(error);
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
        key: 'skeletonRepository',
        get: function get() {
            return this._skeletonRepository;
        }
    }]);

    return RoutingController;
}(_Controller3.default);

exports.default = RoutingController;