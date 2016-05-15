/*
 * Units tests
 */

/*
 * Global dependencies
 */
import test from 'unit.js'

const bundleManager   = global.BundleManager
const http            = bundleManager.container.getComponent( 'Http' )
const controller      = bundleManager.container.getComponent( 'Controller' )
const request         = bundleManager.container.getComponent( 'Request' )
const database        = bundleManager.database

/*
 * Local dependencies
 */
const skeletonFactory               = bundleManager.getFactory( 'Skeleton' )
const skeletonRoutingController     = skeletonFactory.getController()
const skeletonRepository            = skeletonFactory.getRepository()
const skeleton                      = skeletonFactory.getModel()

/*
 * Tests
 */
describe( 'Skeleton bundle tests', () => {
  it( 'example variable', () => {
    // just for example of tested value
    let example = 'hello world'

    test
      .string(example)
        .startsWith('hello')
        .match(/[a-z]/)
      .given(example = 'you are welcome')
        .string(example)
          .endsWith('welcome')
          .contains('you')
      .when('"example" becomes an object', () => {
        example = {
          message: 'hello world',
          name: 'Nico',
          job: 'developper',
          from: 'France'
        }
      })
      .then('test the "example" object', () => {
        test
          .object(example)
            .hasValue('developper')
            .hasProperty('name')
            .hasProperty('from', 'France')
            .contains({message: 'hello world'})

      })
      .if(example = 'bad value')
        .error( () => {
          example.badMethod()
        })

  })
  it('other test case', () => {
    // other tests ...
  })
})