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
}

/*
 * Permit mocha to access to run() method called implicitely and run unit tests
 */
new UserTests()
