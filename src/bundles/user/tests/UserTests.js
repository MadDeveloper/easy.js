/*
 * Units tests
 */
import test     from 'unit.js'
import Tests    from './../../../vendor/easy/core/Tests'

class UserTests extends Tests {
    constructor( container ) {
        super( container )

        /*
         * Local dependencies
         */
        this._userFactory           = this._bundleManager.getFactory( 'user' )
        this._userRoutingController = this._userFactory.getController()
        this._userRepository        = this._userFactory.getRepository()
        this._user                  = this._userFactory.getModel()
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
