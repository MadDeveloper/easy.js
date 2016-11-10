const Tests = require( 'vendor/easy/core/Tests' )

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
 * Permit Jasmine to access to run() method called implicitely and run unit tests
 */
new SkeletonTests()
