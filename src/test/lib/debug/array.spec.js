/* global describe it */

/*
 * Unit tests
 */
import test from 'unit.js'

/*
 * Alternative style
 *
 * const assert    = test.assert
 * const must      = test.must
 * const should    = test.should
 */

describe( 'Array.js library tests', () => {
    it( 'treeView tests', () => {
        // just for example of tested value
        let example = 'hello world'

        test
          .string(example)
            .startsWith('hello')
            .match(/[a-z]/)
    })
})
