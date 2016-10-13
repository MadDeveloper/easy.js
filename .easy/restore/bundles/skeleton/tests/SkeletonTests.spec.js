import Tests from '~/vendor/easy/core/Tests'

/**
 * @class SkeletonTests
 * @extends Tests
 */
class SkeletonTests extends Tests {
    /*
     * Automatically called
     */
    run() {}
}

/*
 * Permit mocha to access to run() method called implicitely and run unit tests
 */
new SkeletonTests()
