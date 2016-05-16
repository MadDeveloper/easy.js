'use strict';

var _unit = require('unit.js');

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bundleManager = global.BundleManager; /*
                                           * Units tests
                                           */

/*
 * Global dependencies
 */

var http = bundleManager.container.getComponent('Http');
var controller = bundleManager.container.getComponent('Controller');
var request = bundleManager.container.getComponent('Request');
var database = bundleManager.database;

/*
 * Local dependencies
 */
var userFactory = bundleManager.getFactory('User');
var userRoutingController = userFactory.getController();
var userRepository = userFactory.getRepository();
var user = userFactory.getModel();

/*
 * Tests
 */
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