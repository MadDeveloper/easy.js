const Tests = require( 'easy/core/Tests' )
const RoleController = require( '../' ).controller

/**
 * @class RoleTests
 * @extends Tests
 */
class RoleTests extends Tests {
    /*
     * Automatically called
     */
    run() {
        this.roleController = new RoleController( easy.application.container )

        /*
         * Execute all tests
         */
        this.getRolesTest()
    }

    /**
     * getRolesTest - description
     *
     * @returns {type}  description
     */
    getRolesTest() {
        this.roleController.getRoles( this.request, this.response )
    }
}

/*
 * Permit Jasmine to access to run() method called implicitely and run units tests
 */
new RoleTests()
