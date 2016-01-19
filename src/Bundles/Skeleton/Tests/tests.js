/*
 * Units tests
 */

/*
 * Global dependencies
 */
var test            = require('unit.js');
var BundleManager   = global.BundleManager;
var http            = BundleManager.getDependencyInjector().getDependency( 'Http' );
var Controller      = BundleManager.getDependencyInjector().getDependency( 'Controller' );
var Request         = BundleManager.getDependencyInjector().getDependency( 'Request' );
var database        = BundleManager.getDatabase();

/*
 * Local dependencies
 */
var SkeletonFactory     = BundleManager.getFactory( 'Skeleton' );
var SkeletonController  = SkeletonFactory.getController();
var SkeletonRepository  = SkeletonFactory.getRepository();
var Skeleton            = SkeletonFactory.getModel();

/*
 * Tests
 */
describe('Skeleton bundle tests', function() {
  it('example variable', function(){
    // just for example of tested value
    var example = 'hello world';
    test
      .string(example)
        .startsWith('hello')
        .match(/[a-z]/)
      .given(example = 'you are welcome')
        .string(example)
          .endsWith('welcome')
          .contains('you')
      .when('"example" becomes an object', function() {
        example = {
          message: 'hello world',
          name: 'Nico',
          job: 'developper',
          from: 'France'
        };
      })
      .then('test the "example" object', function() {
        test
          .object(example)
            .hasValue('developper')
            .hasProperty('name')
            .hasProperty('from', 'France')
            .contains({message: 'hello world'})
        ;
      })
      .if(example = 'bad value')
        .error(function(){
          example.badMethod();
        })
    ;
  });
  it('other test case', function(){
    // other tests ...
  });
});
