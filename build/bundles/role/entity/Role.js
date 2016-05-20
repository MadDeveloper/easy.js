'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Entity2 = require('./../../../vendor/easy/core/Entity');

var _Entity3 = _interopRequireDefault(_Entity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Role model
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Role = function (_Entity) {
    _inherits(Role, _Entity);

    function Role(roleFactory) {
        var _ret;

        _classCallCheck(this, Role);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Role).call(this, roleFactory));

        var self = _this;

        return _ret = _this.database.Model.extend({
            tableName: 'roles',

            users: function users() {
                return this.hasMany(self.bundleManager.getFactory('user').getModel());
            }
        }), _possibleConstructorReturn(_this, _ret);
    }

    return Role;
}(_Entity3.default);

exports.default = Role;