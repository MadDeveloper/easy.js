/* global describe it */

/*
 * Unit tests
 */
import test     from 'unit.js'
import Tests    from '~/vendor/easy/core/Tests'

/*
 * Alternative style
 *
 * const assert    = test.assert
 * const must      = test.must
 * const should    = test.should
 */

class UserTests extends Tests {
    constructor( container ) {
        super( container )

        /*
         * Local dependencies
         */
        this._userRoutingController = this.factory.getController( 'user' )
        this._userRepository        = this.entityManager.getRepository( 'user' )
        this._user                  = this.entityManager.getModel( 'user' )
    }

    /*
     * Automatically called
     */
    run() {
        describe( 'User bundle tests', () => {
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
    }

    /*
     * Getters and setters
     */
    get userFactory() {
        return this._userFactory
    }

    get userRoutingController() {
        return this._userRoutingController
    }

    get userRepository() {
        return this._userRepository
    }

    get user() {
        return this._user
    }
}

/*
 * Permit mocha to access to run() method called implicitely and run unit tests
 */
new UserTests( global.container )
