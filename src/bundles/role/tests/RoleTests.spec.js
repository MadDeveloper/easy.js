const Tests = require( 'easy/core/Tests' )

/**
 * @class RoleTests
 * @extends Tests
 */
class RoleTests extends Tests {
    /*
     * Automatically called
     */
    run() {}
}

/*
 * Permit Jasmine to access to run() method called implicitely and run units tests
 */
new RoleTests()
