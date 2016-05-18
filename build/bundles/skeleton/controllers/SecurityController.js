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

var SecurityController = function (_Controller) {
    _inherits(SecurityController, _Controller);

    function SecurityController(skeletonFactory) {
        _classCallCheck(this, SecurityController);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SecurityController).call(this, skeletonFactory.container));

        _this._access = _this.container.getService('security.access');
        return _this;
    }

    _createClass(SecurityController, [{
        key: 'authorize',
        value: function authorize() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                if (_this2.isProdEnv()) {
                    var token = _this2.request.getBodyParameter('token');

                    _this2.access.restrict({
                        mustBe: [_this2.access.any],
                        canCreate: [],
                        canRead: [],
                        canUpdate: [],
                        canDelete: []
                    });

                    if (_this2.access.focusOn(token.role_id).canReach(_this2.request.getMethod())) {
                        resolve();
                    } else {
                        _this2.response.forbidden();
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
        key: 'access',
        get: function get() {
            return this._access;
        }
    }]);

    return SecurityController;
}(_Controller3.default);

exports.default = SecurityController;