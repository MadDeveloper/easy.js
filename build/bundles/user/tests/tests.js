'use strict';

/*
 * Units tests
 */

/*
 * Global dependencies
 */
var test = require('unit.js');
var BundleManager = global.BundleManager;
var http = BundleManager.getContainer().getComponent('Http');
var Controller = BundleManager.getContainer().getComponent('Controller');
var Request = BundleManager.getContainer().getComponent('Request');
var database = BundleManager.getDatabase();

/*
 * Local dependencies
 */
var UserFactory = BundleManager.getFactory('User');
var UserController = UserFactory.getController();
var UserRepository = UserFactory.getRepository();
var User = UserFactory.getModel();

/*
 * Tests
 */
describe('User bundle tests', function () {
  it('example variable', function () {
    // just for example of tested value
    var example = 'hello world';
    test.string(example).startsWith('hello').match(/[a-z]/).given(example = 'you are welcome').string(example).endsWith('welcome').contains('you').when('"example" becomes an object', function () {
      example = {
        message: 'hello world',
        name: 'Nico',
        job: 'developper',
        from: 'France'
      };
    }).then('test the "example" object', function () {
      test.object(example).hasValue('developper').hasProperty('name').hasProperty('from', 'France').contains({ message: 'hello world' });
    }).if(example = 'bad value').error(function () {
      example.badMethod();
    });
  });
  it('other test case', function () {
    // other tests ...
  });
});