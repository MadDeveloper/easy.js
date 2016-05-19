'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Factory2 = require('./../../vendor/easy/core/Factory');

var _Factory3 = _interopRequireDefault(_Factory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoleFactory = function (_Factory) {
    _inherits(RoleFactory, _Factory);

    function RoleFactory(bundleManager) {
        _classCallCheck(this, RoleFactory);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RoleFactory).call(this, 'role', bundleManager));
    }

    return RoleFactory;
}(_Factory3.default);

exports.default = RoleFactory;