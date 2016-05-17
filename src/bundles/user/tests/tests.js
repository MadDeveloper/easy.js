/*
 * Units tests
 */

/*
 * Global dependencies
 */
import test from 'unit.js'

const bundleManager = global.BundleManager
const database      = bundleManager.database
const container     = bundleManager.container
const controller    = container.getComponent( 'Controller' )
const request       = container.getComponent( 'Request' )
const response      = container.getComponent( 'Response' )

/*
 * Local dependencies
 */
const userFactory              = bundleManager.getFactory( 'User' )
const userRoutingController    = userFactory.getController()
const userRepository           = userFactory.getRepository()
const user                     = userFactory.getModel()

/*
 * Tests
 */
describe('User bundle tests', () => {
  it('example variable', () => {
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
