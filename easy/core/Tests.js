/**
 * @class Tests
 */
class Tests {
    /**
     * @constructor
     */
    constructor() {
        this.application = easy.application
        this.container = this.application.container
        this.request = this.mockRequest()
        this.response = this.mockResponse()

        this.run()
    }

    /**
     * run - automatically called
     */
    run() {}

    /**
     * mockRequest - description
     *
     * @returns {type}  description
     */
    mockRequest() {
        return jasmine.createSpyObj( 'request', [ '' ] )
    }

    /**
     * mockResponse - description
     *
     * @returns {type}  description
     */
    mockResponse() {
        return jasmine.createSpyObj( 'response', [ '' ] )
    }
}

module.exports = Tests
