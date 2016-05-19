'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _unit = require('unit.js');

var _unit2 = _interopRequireDefault(_unit);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _Tests2 = require('./../../../vendor/easy/core/Tests');

var _Tests3 = _interopRequireDefault(_Tests2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Units tests
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var assert = _chai2.default.assert;
var expect = _chai2.default.expect;

var UserTests = function (_Tests) {
  _inherits(UserTests, _Tests);

  function UserTests(container) {
    _classCallCheck(this, UserTests);

    /*
     * Local dependencies
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UserTests).call(this, container));

    _this._userFactory = _this._bundleManager.getFactory('user');
    _this._userRoutingController = _this._userFactory.getController();
    _this._userRepository = _this._userFactory.getRepository();
    _this._user = _this._userFactory.getModel();
    return _this;
  }

  /*
   * Automatically called
   */


  _createClass(UserTests, [{
    key: 'run',
    value: function run() {
      describe('User bundle tests', function () {
        it('example variable', function () {
          // just for example of tested value
          var example = 'hello world';

          _unit2.default.string(example).startsWith('hello').match(/[a-z]/).given(example = 'you are welcome').string(example).endsWith('welcome').contains('you').when('"example" becomes an object', function () {
            example = {
              message: 'hello world',
              name: 'Nico',
              job: 'developper',
              from: 'France'
            };
          }).then('test the "example" object', function () {
            _unit2.default.object(example).hasValue('developper').hasProperty('name').hasProperty('from', 'France').contains({ message: 'hello world' });
          }).if(example = 'bad value').error(function () {
            example.badMethod();
          });
        });
        it('other test case', function () {
          // other tests ...
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
    key: 'userRoutingController',
    get: function get() {
      return this._userRoutingController;
    }
  }, {
    key: 'userRepository',
    get: function get() {
      return this._userRepository;
    }
  }, {
    key: 'user',
    get: function get() {
      return this._user;
    }
  }]);

  return UserTests;
}(_Tests3.default);

/*
 * Permit mocha to access to run() method called implicitely and run unit tests
 */


new UserTests(global.container);