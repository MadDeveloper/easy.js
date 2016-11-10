/**
 * @class Tests
 */
module.exports = class Tests {
    /**
     * @constructor
     */
    constructor() {
        this.application = easy.application
        this.container = this.application.container

        this.run()
    }

    /**
     * run - automatically called
     */
    run() {}
}
