import Tests from '~/vendor/easy/core/Tests'

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
 * Permit mocha to access to run() method called implicitely and run unit tests
 */
new RoleTests()
