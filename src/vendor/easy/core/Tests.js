/**
 * @class Tests
 */
export default class Tests {
    /**
     * @constructor
     */
    constructor() {
        this.application = global.easy.application
        this.container = this.application.container

        this.run()
    }

    /**
     * run - automatically called
     */
    run() {}
}
