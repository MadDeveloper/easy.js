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
 * Permit Jasmine to access to run() method called implicitely and run units tests
 */
new UserTests()
