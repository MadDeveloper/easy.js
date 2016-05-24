/*
 * Unit tests
 */
import test     from 'unit.js'
import Tests    from './../../../vendor/easy/core/Tests'

/*
 * Alternative style
 *
 * const assert    = test.assert
 * const must      = test.must
 * const should    = test.should
 */

class SkeletonTests extends Tests {
    constructor( container ) {
        super( container )

        /*
         * Local dependencies
         */
        this._skeletonFactory           = this._bundleManager.getFactory( 'skeleton' )
        this._skeletonRoutingController = this._skeletonFactory.getController()
        this._skeletonRepository        = this._skeletonFactory.getRepository()
        this._skeleton                  = this._skeletonFactory.getModel()
    }

    /*
     * Automatically called
     */
    run() {
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
    }

    /*
     * Getters and setters
     */
    get skeletonFactory() {
        return this._skeletonFactory
    }

    get skeletonRoutingController() {
        return this._skeletonRoutingController
    }

    get skeletonRepository() {
        return this._skeletonRepository
    }

    get skeleton() {
        return this._skeleton
    }
}

/*
 * Permit mocha to access to run() method called implicitely and run unit tests
 */
new SkeletonTests( global.container )
