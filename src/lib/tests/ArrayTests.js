/*
 * Units tests
 */
import test     from 'unit.js'
import Tests    from './../../vendor/easy/core/Tests'

class ArrayTests extends Tests {
    constructor( container ) {
        super( container )
    }

    /*
     * Automatically called
     */
    run() {
        describe( 'Array.js library tests', () => {
            it( 'treeView tests', () => {

            })
        })
    }
}

/*
 * Permit mocha to access to run() method called implicitely and run unit tests
 */
new ArrayTests( global.container )
