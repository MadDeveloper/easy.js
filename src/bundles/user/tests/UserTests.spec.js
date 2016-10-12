import Tests from '~/vendor/easy/core/Tests'

/**
 * @class UserTests
 * @extends Tests
 */
class UserTests extends Tests {
    /*
     * Automatically called
     */
    run() {}
}

/*
 * Permit mocha to access to run() method called implicitely and run unit tests
 */
new UserTests()
